using System.Text.Json;

namespace Confix.Authoring;

public interface IComponentService
{
    Task<Component?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

    Task<IReadOnlyList<Component>> SearchAsync(
        IReadOnlyList<ComponentScope> scopes,
        string? search,
        int skip,
        int take,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<SchemaViolation>> GetSchemaViolationsAsync(
        Guid id,
        string values,
        CancellationToken cancellationToken);

    Task<Component> CreateAsync(
        string name,
        string schemaSdl,
        string @namespace,
        IReadOnlyList<ComponentScope> scopes,
        JsonElement values,
        CancellationToken cancellationToken);

    Task<Component> RenameAsync(Guid id, string name, CancellationToken cancellationToken);

    Task<Component> UpdateSchemaAsync(
        Guid id,
        string schemaSdl,
        JsonElement values,
        CancellationToken cancellationToken);

    Task<Component> UpdateValuesAsync(
        Guid id,
        JsonElement values,
        CancellationToken cancellationToken);

    Task<Component> UpdateScopesAsync(
        Guid id,
        IReadOnlyList<ComponentScope> scopes,
        CancellationToken cancellationToken);
}
