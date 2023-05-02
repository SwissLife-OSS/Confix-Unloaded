namespace Confix.Authoring.Store;

public interface IVariableStore
{
    Task<Variable?> CreateAsync(Variable variable, CancellationToken cancellationToken);

    Task<Variable?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    Task<IReadOnlyList<Variable?>> GetByNamesAsync(
        IEnumerable<string> names,
        CancellationToken cancellationToken);

    Task<IEnumerable<Variable?>> GetManyAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken);

    Task<Variable?> UpdateAsync(Variable variable, CancellationToken cancellationToken);

    IQueryable<Variable> Query();
}
