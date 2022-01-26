using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;

namespace Confix.Authoring;

public interface IComponentService
{
    Task<Component?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default);

    Task<ISchema?> GetSchemaByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default);

    Task<IReadOnlyCollection<Component>> GetManyByIdAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken);

    IQueryable<Component> Query();

    Task<Component> CreateAsync(
        string name,
        string? schemaSdl,
        IDictionary<string, object?>? values,
        CancellationToken cancellationToken);

    Task<Component> RenameAsync(
        Guid id,
        string name,
        CancellationToken cancellationToken);

    Task<Component> SetSchemaAsync(
        Guid id,
        string schemaSdl,
        CancellationToken cancellationToken);

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
}
