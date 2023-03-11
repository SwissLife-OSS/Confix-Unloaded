using MongoDB.Bson;
using MongoDB.Driver;
using static MongoDB.Driver.Builders<Confix.Authoring.Store.Application>;

namespace Confix.Authoring.Store.Mongo;

internal sealed class ApplicationStore : IApplicationStore
{
    private readonly IAuthoringDbContext _dbContext;

    public ApplicationStore(IAuthoringDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Application?> FindByApplicationNameAsync(
        string applicationName,
        CancellationToken cancellationToken = default)
    {
        // TODO Unique index on application name
        var filter = Filter.Eq(x => x.Name, applicationName);

        return await _dbContext.Applications.Find(filter).FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<Application?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var filter = Filter.Eq(x => x.Id, id);

        return await _dbContext.Applications.Find(filter).SingleOrDefaultAsync(cancellationToken);
    }

    public Task<Application?> GetByPartIdAsync(Guid partId, CancellationToken cancellationToken)
    {
        var filter =
            Filter.ElemMatch(x => x.Parts, Builders<ApplicationPart>.Filter.Eq(x => x.Id, partId));

        return _dbContext.Applications.Find(filter).FirstOrDefaultAsync(cancellationToken)!;
    }

    public Task<Application?> GetByComponentPartIdAsync(
        Guid componentPartId,
        CancellationToken cancellationToken)
    {
        var filter = Filter.ElemMatch(x => x.Parts,
            Builders<ApplicationPart>.Filter.ElemMatch(x => x.Components,
                Builders<ApplicationPartComponent>.Filter.Eq(x => x.Id, componentPartId)));

        return _dbContext.Applications.Find(filter).FirstOrDefaultAsync(cancellationToken)!;
    }

    public async Task<IReadOnlyList<Application>> GetApplicationsByComponentIdAsync(
        IEnumerable<Guid> componentIds,
        CancellationToken cancellationToken)
    {
        var filter = Filter.In(
            $"{nameof(Application.Parts)}.{nameof(ApplicationPart.Components)}.{nameof(ApplicationPartComponent.Id)}",
            componentIds);

        return await _dbContext.Applications.Find(filter).ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Application>> GetApplicationsByPartIdsAsync(
        IEnumerable<Guid> partIds,
        CancellationToken cancellationToken)
    {
        var filter = Filter.ElemMatch(x => x.Parts,
            Builders<ApplicationPart>.Filter.In(x => x.Id, partIds));

        return await _dbContext.Applications.Find(filter).ToListAsync(cancellationToken);
    }

    public async Task<ApplicationPart?> GetPartByIdAsync(
        Guid id,
        CancellationToken cancellationToken)
    {
        var application = await GetByPartIdAsync(id, cancellationToken);

        return application?.Parts.First(t => t.Id == id);
    }

    public async Task<IReadOnlyCollection<Application>> GetManyByIdAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken)
    {
        var filter = Filter.In(x => x.Id, ids);

        return await _dbContext.Applications.Find(filter).ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Application>> Search(
        int skip,
        int take,
        IReadOnlySet<string> namespaces,
        string? search,
        CancellationToken cancellationToken)
    {
        var filter = Filter.In(x => x.Namespace, namespaces);

        if (!string.IsNullOrEmpty(search))
        {
            filter &=
                Filter.Or(
                    Filter.Regex(x => x.Name, new BsonRegularExpression(search, "i")),
                    Filter.Regex(x => x.Namespace, new BsonRegularExpression(search, "i")),
                    Filter.ElemMatch(
                        x => x.Parts,
                        Builders<ApplicationPart>.Filter
                            .Regex(x => x.Name, new BsonRegularExpression(search, "i"))
                    )
                );
        }

        return await _dbContext.Applications
            .Find(filter)
            .Skip(skip)
            .Limit(take)
            .ToListAsync(cancellationToken);
    }

    public IQueryable<Application> Query()
    {
        return _dbContext.Applications.AsQueryable();
    }

    public async Task AddAsync(Application application, CancellationToken cancellationToken)
    {
        if (application is null)
        {
            throw new ArgumentNullException(nameof(application));
        }

        await _dbContext.Applications.InsertOneAsync(application, null, cancellationToken);
    }

    public async Task ReplaceAsync(Application application, CancellationToken cancellationToken)
    {
        if (application is null)
        {
            throw new ArgumentNullException(nameof(application));
        }

        await _dbContext.Applications.ReplaceOneAsync(
            x => x.Id == application.Id,
            application,
            new ReplaceOptions { IsUpsert = false },
            cancellationToken);
    }
}
