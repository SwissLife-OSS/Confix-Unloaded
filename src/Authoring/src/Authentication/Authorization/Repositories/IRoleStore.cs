namespace Confix.Authentication.Authorization;

public interface IRoleStore
{
    Task<IReadOnlyList<Role>> GetAllAsync(CancellationToken cancellationToken);

    Task<Role?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    Task<Role> UpsertAsync(
        Role group,
        CancellationToken cancellationToken);

    Task<Role?> DeleteByIdAsync(
        Guid id,
        CancellationToken cancellationToken);
}
