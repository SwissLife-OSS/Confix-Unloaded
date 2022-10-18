namespace Confix.Authentication.Authorization;

public interface IRoleService
{
    Task<Role> CreateAsync(
        string name,
        IReadOnlyList<Permission> permissions,
        CancellationToken cancellationToken);

    Task<Role> RenameRoleAsync(
        Guid id,
        string name,
        CancellationToken cancellationToken);

    Task<Role> UpdateRolePermissionsAsync(
        Guid id,
        IReadOnlyList<Permission> permissions,
        CancellationToken cancellationToken);

    Task<Role?> DeleteByIdAsync(
        Guid id,
        CancellationToken cancellationToken);

    Task<Role?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<Role>> GetByIdsAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken);

    Task<IQueryable<Role>> SearchRoleAsync(string? name, CancellationToken cancellationToken);
}
