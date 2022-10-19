using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using static MongoDB.Driver.Builders<Confix.Authoring.VariableValue>;

namespace Confix.Authoring.Store.Mongo;

internal sealed class VariableStore : IVariableStore
{
    private readonly IAuthoringDbContext _dbContext;

    public VariableStore(IAuthoringDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Variable>> GetAllByNamespacesAsync(
        IEnumerable<string> namespaces,
        CancellationToken cancellationToken)
    {
        var filter = Builders<Variable>.Filter.In(x => x.Namespace, namespaces);

        return await _dbContext.Variables.Find(filter).ToListAsync(cancellationToken);
    }

    public async Task<Variable?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _dbContext.Variables
            .Find(Builders<Variable>.Filter.Eq(x => x.Id, id))
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Variable?>> GetByNamesAsync(
        IEnumerable<string> names,
        CancellationToken cancellationToken)
    {
        var filter = Builders<Variable>.Filter.In(x => x.Name, names);

        return await _dbContext.Variables
            .Find(filter)
            .ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<VariableValue>> GetByApplicationPartIdAsync(
        Guid partId,
        CancellationToken cancellationToken)
    {
        return await GetByApplicationPartIdAsyncInternal(partId, null, cancellationToken);
    }

    public async Task<IEnumerable<VariableValue>> GetByApplicationIdAsync(
        Guid applicationId,
        CancellationToken cancellationToken)
    {
        return await GetByApplicationIdAsyncInternal(applicationId, null, cancellationToken);
    }

    public async Task<IEnumerable<VariableValue>> GetGlobalVariableValue(
        CancellationToken cancellationToken)
    {
        return await GetGlobalVariableValueInternal(null, cancellationToken);
    }

    public async Task<IEnumerable<VariableValue>> GetByApplicationPartIdAsync(
        Guid partId,
        IEnumerable<Guid> variableIds,
        CancellationToken cancellationToken)
    {
        return await GetByApplicationPartIdAsyncInternal(partId, variableIds, cancellationToken);
    }

    public async Task<IEnumerable<VariableValue>> GetByApplicationIdAsync(
        Guid applicationId,
        IEnumerable<Guid> variableIds,
        CancellationToken cancellationToken)
    {
        return await GetByApplicationIdAsyncInternal(applicationId, variableIds, cancellationToken);
    }

    public async Task<IEnumerable<VariableValue>> GetGlobalVariableValue(
        IEnumerable<Guid>? variableIds,
        CancellationToken cancellationToken)
    {
        return await GetGlobalVariableValueInternal(variableIds, cancellationToken);
    }

    public async Task<IEnumerable<Variable?>> GetManyAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken)
    {
        return await _dbContext.Variables
            .AsQueryable()
            .Where(x => ids.Contains(x.Id))
            .ToListAsync(cancellationToken);
    }

    public async Task<Variable?> CreateAsync(
        Variable? variable,
        CancellationToken cancellationToken)
    {
        await _dbContext.Variables.InsertOneAsync(variable, null, cancellationToken);

        return variable;
    }

    public async Task<Variable?> UpdateAsync(
        Variable? variable,
        CancellationToken cancellationToken)
    {
        ReplaceOptions options = new() { IsUpsert = false };

        await _dbContext.Variables
            .ReplaceOneAsync(x => x.Id == variable.Id, variable, options, cancellationToken);

        return variable;
    }

    public IQueryable<Variable> Query()
    {
        return _dbContext.Variables.AsQueryable();
    }

    public async Task<IEnumerable<Variable?>> GetAllAsync(
        IEnumerable<string> names,
        CancellationToken cancellationToken)
    {
        var filter = Builders<Variable>.Filter.In(x => x.Name, names);

        return await _dbContext.Variables.Find(filter).ToListAsync(cancellationToken);
    }

    private async Task<IEnumerable<VariableValue>> GetByApplicationPartIdAsyncInternal(
        Guid partId,
        IEnumerable<Guid>? variableIds,
        CancellationToken cancellationToken)
    {
        var filter = Filter.Eq(x => x.Key.PartId, partId);

        if (variableIds is not null)
        {
            filter &= Filter.In(x => x.Key.VariableId, variableIds);
        }

        return await _dbContext.VariableValues.Find(filter).ToListAsync(cancellationToken);
    }

    private async Task<IEnumerable<VariableValue>> GetByApplicationIdAsyncInternal(
        Guid applicationId,
        IEnumerable<Guid>? variableIds,
        CancellationToken cancellationToken)
    {
        var filter = Filter.And(
            Filter.Eq(x => x.Key.ApplicationId, applicationId),
            Filter.Type(x => x.Key.PartId, BsonType.Null));

        if (variableIds is not null)
        {
            filter &= Filter.In(x => x.Key.VariableId, variableIds);
        }

        return await _dbContext.VariableValues.Find(filter).ToListAsync(cancellationToken);
    }

    private async Task<IEnumerable<VariableValue>> GetGlobalVariableValueInternal(
        IEnumerable<Guid>? variableIds,
        CancellationToken cancellationToken)
    {
        var filter = Filter.And(
            Filter.Type(x => x.Key.ApplicationId, BsonType.Null),
            Filter.Type(x => x.Key.PartId, BsonType.Null));

        if (variableIds is not null)
        {
            filter &= Filter.In(x => x.Key.VariableId, variableIds);
        }

        return await _dbContext.VariableValues.Find(filter).ToListAsync(cancellationToken);
    }
}
