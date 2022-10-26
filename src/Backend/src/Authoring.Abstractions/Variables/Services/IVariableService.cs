namespace Confix.Authoring;

public interface IVariableService
{
    Task<Variable?> CreateAsync(
        string name,
        string @namespace,
        bool isSecret,
        string? defaultValue,
        CancellationToken cancellationToken);

    Task<IEnumerable<Variable>> GetAllAsync(CancellationToken cancellationToken);

    Task<IEnumerable<Variable?>> GetByNamesAsync(
        IEnumerable<string> names,
        CancellationToken cancellationToken);

    Task<IQueryable<Variable>> SearchVariables(string? search, CancellationToken cancellationToken);

    Task<Variable?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    Task<VariableValue> SaveValueAsync(
        Guid variableId,
        string value,
        Guid? valueId = null,
        Guid? applicationId = null,
        Guid? partId = null,
        Guid? environmentId = null,
        CancellationToken cancellationToken = default);

    Task<IEnumerable<VariableValue>> GetValuesAsync(
        VariableValueFilter filter,
        bool decrypt,
        CancellationToken cancellationToken);

    Task<IEnumerable<VariableValue>> GetValuesAsync(
        Variable variable,
        VariableValueFilter filter,
        bool decrypt,
        CancellationToken cancellationToken);

    Task<IEnumerable<VariableValue>> GetValuesByApplicationPartAsync(
        Guid applicationPartId,
        CancellationToken cancellationToken);

    Task<IEnumerable<VariableValue>> GetValuesByApplicationAsync(
        Guid applicationId,
        CancellationToken cancellationToken);

    Task<IEnumerable<VariableValue>> GetGlobalValues(CancellationToken cancellationToken);

    Task<VariableValue> DeleteValueAsync(Guid id, CancellationToken cancellationToken);

    Task<Variable?> RenameAsync(Guid id, string name, CancellationToken cancellationToken);
}
