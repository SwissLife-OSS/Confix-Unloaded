using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Confix.Authoring;

public interface IEnvironmentService
{
    Task<Environment?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<Environment>> GetByIdsAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken = default);

    Task<Environment?> GetByNameAsync(
        string name,
        CancellationToken cancellationToken = default);

    Task<Environment> CreateAsync(
        string name,
        CancellationToken cancellationToken = default);

    Task<Environment> RenameAsync(
        Guid environmentId,
        string name,
        CancellationToken cancellationToken = default);

    Task<Environment> DeleteById(
        Guid environmentId,
        CancellationToken cancellationToken = default);

    Task<Environment> SetParent(
        Guid environmentId,
        Guid parentId,
        CancellationToken cancellationToken = default);

    IQueryable<Environment> SearchAsync(
        string? search,
        CancellationToken cancellationToken = default);
}
