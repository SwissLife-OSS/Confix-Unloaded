using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Confix.Authoring.Store.Mongo;

internal sealed class VariableStore : IVariableStore
{
    private readonly IAuthoringDbContext _dbContext;

    public VariableStore(IAuthoringDbContext dbContext)
    {
        _dbContext = dbContext;
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
        Variable variable,
        CancellationToken cancellationToken)
    {
        await _dbContext.Variables.InsertOneAsync(variable, null, cancellationToken);

        return variable;
    }

    public async Task<Variable?> UpdateAsync(
        Variable variable,
        CancellationToken cancellationToken)
    {
        await _dbContext.Variables.ReplaceOneAsync(
            x => x.Id == variable.Id,
            variable,
            new ReplaceOptions{ IsUpsert = false },
            cancellationToken);

        return variable;
    }

    public IQueryable<Variable> Query()
    {
        return _dbContext.Variables.AsQueryable();
    }
}
