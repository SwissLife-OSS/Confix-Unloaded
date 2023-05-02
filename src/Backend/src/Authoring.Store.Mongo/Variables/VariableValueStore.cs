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

    public async Task<IEnumerable<VariableValue>> GetByFilterAsync(
        IEnumerable<Guid>? variableIds,
        IEnumerable<VariableValueScope>? filters,
        CancellationToken cancellationToken)
    {
        var filter = Filter.Empty;

        if (variableIds != null)
        {
            filter &= Filter.In(x => x.VariableId, variableIds);
        }

        if (filters != null)
        {
            filter &= Filter.Or(filters.Select(ToFilter));
        }

        return await _dbContext.VariableValues
            .Find(filter)
            .ToListAsync(cancellationToken);
    }

    public async Task<VariableValue> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _dbContext.VariableValues
            .AsQueryable()
            .Where(x => x.Id == id)
            .SingleAsync(cancellationToken);
    }

    public async Task<IEnumerable<VariableValue>> GetManyAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken)
    {
        return await _dbContext.VariableValues.AsQueryable()
            .Where(x => ids.Contains(x.Id))
            .ToListAsync(cancellationToken);
    }

    public async Task<VariableValue> SaveAsync(
        VariableValue value,
        CancellationToken cancellationToken)
    {
        await _dbContext.VariableValues.ReplaceOneAsync(
            Filter.And(
                Filter.Eq(x => x.VariableId, value.VariableId),
                ToFilter(value.Scope)),
            value,
            new ReplaceOptions { IsUpsert = true },
            cancellationToken);

        return value;
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        await _dbContext.VariableValues.DeleteOneAsync(x => x.Id == id, null, cancellationToken);
    }

    private static FilterDefinition<VariableValue> ToFilter(VariableValueScope filter)
    {
        var filterDefinition = filter switch
        {
            ApplicationVariableValueScope f
                => Filter.Eq("Scope.ApplicationId", f.ApplicationId),
            ApplicationPartVariableValueScope f
                => Filter.Eq("Scope.PartId", f.PartId),
            NamespaceVariableValueScope f
                => Filter.Eq("Scope.Namespace", f.Namespace),
            _ => throw new ArgumentOutOfRangeException(nameof(filter))
        };

        if (filter.EnvironmentId is not null)
        {
            filterDefinition &= Filter.Eq(x => x.Scope.EnvironmentId, filter.EnvironmentId);
        }

        return filterDefinition;
    }
}
