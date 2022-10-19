using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Confix.Authoring.Store.Mongo;

internal sealed class EnvironmentStore : IEnvironmentStore
{
    private readonly IAuthoringDbContext _dbContext;

    public EnvironmentStore(IAuthoringDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Environment?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _dbContext.Environments
            .AsQueryable()
            .Where(x => x.Id == id)
            .SingleAsync(cancellationToken);
    }

    public async Task<Environment?> GetByNameAsync(string name, CancellationToken cancellationToken)
    {
        return await _dbContext.Environments
            .AsQueryable()
            .Where(x => x.Name == name)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<IReadOnlyCollection<Environment>> GetManyByIdAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken)
    {
        return await _dbContext.Environments
            .AsQueryable()
            .Where(x => ids.Contains(x.Id))
            .ToListAsync(cancellationToken);
    }

    public Task AddAsync(Environment environment, CancellationToken cancellationToken)
    {
        return _dbContext.Environments.InsertOneAsync(environment, default, cancellationToken);
    }

    public async Task<Environment?> RenameAsync(
        Guid environmentId,
        string name,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(name))
        {
            throw new ArgumentNullException(nameof(environmentId));
        }

        return await _dbContext.Environments.FindOneAndUpdateAsync(
            Builders<Environment>.Filter.Eq(t => t.Id, environmentId),
            Builders<Environment>.Update.Set(t => t.Name, name),
            new FindOneAndUpdateOptions<Environment> { ReturnDocument = ReturnDocument.After },
            cancellationToken);
    }

    public async Task<Environment?> RemoveByIdAsync(
        Guid environmentId,
        CancellationToken cancellationToken)
    {
        var filter = Builders<Environment>.Filter.Eq(x => x.Id, environmentId);

        return await _dbContext.Environments
            .FindOneAndDeleteAsync(filter, default, cancellationToken);
    }

    public IQueryable<Environment> SearchAsync(
        string? search,
        CancellationToken cancellationToken = default)
    {
        return search is null
            ? _dbContext.Environments.AsQueryable()
            : _dbContext.Environments.AsQueryable().Where(x => x.Name.Contains(search));
    }

    public async Task<Environment> UpdateAsync(
        Environment environment,
        CancellationToken cancellationToken)
    {
        var filter = Builders<Environment>.Filter.Eq(x => x.Id, environment.Id);

        FindOneAndReplaceOptions<Environment> options = new()
        {
            ReturnDocument = ReturnDocument.After, IsUpsert = false
        };

        return await _dbContext.Environments
            .FindOneAndReplaceAsync(filter, environment, options, cancellationToken);
    }
}
