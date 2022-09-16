namespace Confix.Authentication.Authorization;

public interface IRoleService
{
    Task<Role> CreateAsync(
        string name,
        Permissions permissions,
        CancellationToken cancellationToken);

    Task<Role> UpdateAsync(
        Guid id,
        string name,
        Permissions? permissions,
        CancellationToken cancellationToken);

    Task<Role> DeleteByIdAsync(
        Guid id,
        CancellationToken cancellationToken);
}
