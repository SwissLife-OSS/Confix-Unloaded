namespace Confix.Authoring;

public interface IVariableService
{
    Task<Variable?> CreateAsync(
        string name,
        string @namespace,
        bool isSecret,
        VariableValueScope scope,
        string? defaultValue,
        CancellationToken cancellationToken);

    Task<IQueryable<Variable>> SearchVariables(string? search, CancellationToken cancellationToken);

    Task<Variable?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<string> DecryptedValueAsync(VariableValue variableValue, CancellationToken cancellationToken);

    Task<VariableValue> SaveValueAsync(
        Guid variableId,
        string value,
        VariableValueScope scope,
        CancellationToken cancellationToken);

    Task<IEnumerable<VariableValue>> GetValuesAsync(
        IEnumerable<Guid>? variableIds,
        IEnumerable<VariableValueScope>? filter,
        CancellationToken cancellationToken);

    Task<VariableValue> DeleteValueAsync(Guid id, CancellationToken cancellationToken);

    Task<Variable?> RenameAsync(Guid id, string name, CancellationToken cancellationToken);
}
