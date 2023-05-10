using HotChocolate;

namespace Confix.Authoring;

public interface IComponentService
{
    Task<Component?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

    Task<ISchema?> GetSchemaByIdAsync(Guid id, CancellationToken cancellationToken = default);

    Task<IReadOnlyList<Component>> Search(
        IReadOnlyList<ComponentScope> scopes,
        string? search,
        int skip,
        int take,
        CancellationToken cancellationToken);

    Task<Component> CreateAsync(
        string name,
        string? schemaSdl,
        IReadOnlyList<ComponentScope> scopes,
        IDictionary<string, object?>? values,
        CancellationToken cancellationToken);

    Task<Component> RenameAsync(Guid id, string name, CancellationToken cancellationToken);

    Task<Component> SetSchemaAsync(Guid id, string schemaSdl, CancellationToken cancellationToken);

    Task<Component> SetValuesAsync(
        Guid id,
        IDictionary<string, object?> values,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<SchemaViolation>> GetSchemaViolationsAsync(
        Guid id,
        IDictionary<string, object?> values,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<SchemaViolation>> GetSchemaViolationsAsync(
        Guid id,
        string values,
        CancellationToken cancellationToken);

    Task<IDictionary<string, object?>?> GetDefaultValuesAsync(
        Guid id,
        CancellationToken cancellationToken);

    Task<Component> ChangeComponentScopeByIdAsync(
        Guid id,
        IReadOnlyList<ComponentScope> scopes,
        CancellationToken cancellationToken);
}
