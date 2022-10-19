using MongoDB.Driver;
using MongoDB.Driver.Linq;
using static MongoDB.Driver.Builders<Confix.Authoring.VariableValue>;

namespace Confix.Authoring.Store.Mongo;

internal sealed class VariableValueStore : IVariableValueStore
{
    private readonly IAuthoringDbContext _dbContext;

    public VariableValueStore(IAuthoringDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<VariableValue> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _dbContext.VariableValues.AsQueryable()
            .Where(x => x.Id == id)
            .SingleAsync(cancellationToken);
    }

    public async Task<VariableValue?> GetByKeyAsync(
        VariableKey key,
        CancellationToken cancellationToken)
    {
        var keyFilter = BuildUniqueKeyFilter(key);

        return await _dbContext.VariableValues
            .Find(keyFilter)
            .SingleOrDefaultAsync(cancellationToken);
    }

    public async Task<IEnumerable<VariableValue>> GetManyAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken)
    {
        return await _dbContext.VariableValues.AsQueryable()
            .Where(x => ids.Contains(x.Id))
            .ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<VariableValue>> GetByFilterAsync(
        VariableValueFilter filter,
        CancellationToken cancellationToken)
    {
        var dbFilter = BuildFindKeyFilter(filter);

        var cursor = await _dbContext.VariableValues.FindAsync(dbFilter, null, cancellationToken);

        return await cursor.ToListAsync(cancellationToken);
    }

    public async Task<VariableValue> SaveAsync(
        VariableValue value,
        CancellationToken cancellationToken)
    {
        await _dbContext.VariableValues.ReplaceOneAsync(
            BuildUniqueKeyFilter(value.Key),
            value,
            new ReplaceOptions { IsUpsert = true },
            cancellationToken);

        return value;
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        await _dbContext.VariableValues.DeleteOneAsync(x => x.Id == id, null, cancellationToken);
    }

    private static FilterDefinition<VariableValue> BuildUniqueKeyFilter(VariableKey variableKey)
    {
        return Filter.And(
            Filter.EqOrNull(u => u.Key.VariableId, variableKey.VariableId),
            Filter.EqOrNull(u => u.Key.ApplicationId, variableKey.ApplicationId),
            Filter.EqOrNull(u => u.Key.PartId, variableKey.PartId),
            Filter.EqOrNull(u => u.Key.EnvironmentId, variableKey.EnvironmentId));
    }

    private static FilterDefinition<VariableValue> BuildFindKeyFilter(VariableValueFilter filter)
    {
        var dbFilter = Filter.Eq(x => x.Key.VariableId, filter.Id);

        if (filter.EnvironmentId.HasValue)
        {
            dbFilter &= Filter.EqOrNull(x => x.Key.EnvironmentId, filter.EnvironmentId.Value);
        }

        if (filter.ApplicationId.HasValue)
        {
            dbFilter &= Filter.EqOrNull(x => x.Key.ApplicationId, filter.ApplicationId.Value);
        }

        if (filter.PartId.HasValue)
        {
            dbFilter &= Filter.EqOrNull(x => x.Key.PartId, filter.PartId.Value);
        }

        return dbFilter;
    }
}
