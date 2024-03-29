namespace Confix.Authoring.Store.Mongo;

public interface IVariableValueStore
{
    Task DeleteAsync(Guid id, CancellationToken cancellationToken);

    Task<IReadOnlyList<VariableValue>> GetByFilterAsync(
        IEnumerable<Guid>? ids,
        IEnumerable<VariableValueScope>? filter,
        CancellationToken cancellationToken);

    Task<VariableValue> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    Task<VariableValue> SaveAsync(VariableValue value, CancellationToken cancellationToken);
}
