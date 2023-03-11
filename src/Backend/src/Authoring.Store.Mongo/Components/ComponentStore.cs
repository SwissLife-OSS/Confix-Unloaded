using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using static MongoDB.Driver.Builders<Confix.Authoring.Component>;

namespace Confix.Authoring.Store.Mongo;

internal sealed class ComponentStore : IComponentStore
{
    private readonly IAuthoringDbContext _dbContext;

    public ComponentStore(IAuthoringDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Component> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _dbContext.Components.AsQueryable()
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<IReadOnlyCollection<Component>> GetManyByIdAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken)
    {
        return await _dbContext.Components.AsQueryable()
            .Where(x => ids.Contains(x.Id))
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Component>> Search(
        int skip,
        int take,
        IEnumerable<string> namespaces,
        Guid? applicationId,
        Guid? applicationPartId,
        string? search,
        CancellationToken cancellationToken)
    {
        var filter = Filter.In("Scopes.Namespace", namespaces);

        if (!string.IsNullOrEmpty(search))
        {
            filter &= Filter.Regex(x => x.Name,
                new BsonRegularExpression(search, "i"));
        }

        if (applicationId is not null)
        {
            filter &= Filter.EqOrNull("Scopes.ApplicationId", applicationId);
        }

        if (applicationPartId is not null)
        {
            filter &= Filter.EqOrNull("Scopes.ApplicationPartId", applicationPartId);
        }

        return await _dbContext.Components
            .Find(filter)
            .Skip(skip)
            .Limit(take)
            .ToListAsync(cancellationToken);
    }

    public async Task<Component> AddAsync(Component component, CancellationToken cancellationToken)
    {
        await _dbContext.Components.InsertOneAsync(component, null, cancellationToken);

        return component;
    }

    public async Task<Component> UpdateAsync(
        Component component,
        CancellationToken cancellationToken)
    {
        await _dbContext.Components.ReplaceOneAsync(
            x => x.Id == component.Id,
            component,
            new ReplaceOptions { IsUpsert = false },
            cancellationToken);

        return component;
    }
}
