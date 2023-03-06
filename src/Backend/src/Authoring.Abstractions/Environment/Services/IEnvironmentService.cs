namespace Confix.Authoring;

public interface IEnvironmentService
{
    Task<Environment?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

    Task<IReadOnlyList<Environment>> GetByIdsAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken = default);

    Task<Environment?> GetByNameAsync(string name, CancellationToken cancellationToken = default);

    Task<Environment> CreateAsync(string name, CancellationToken cancellationToken = default);

    Task<Environment> RenameAsync(
        Guid environmentId,
        string name,
        CancellationToken cancellationToken = default);

    Task<Environment> DeleteById(Guid environmentId, CancellationToken cancellationToken = default);

    Task<Environment> SetParent(
        Guid environmentId,
        Guid parentId,
        CancellationToken cancellationToken = default);

    Task<Environment> SetAllowDeveloperAccess(
        Guid environmentId,
        bool isAllowed,
        CancellationToken cancellationToken = default);

    Task<IQueryable<Environment>> SearchAsync(
        string? search,
        CancellationToken cancellationToken = default);
}
