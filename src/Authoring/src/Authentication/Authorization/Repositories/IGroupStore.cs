namespace Confix.Authentication.Authorization;

public interface IGroupStore
{
    Task<IReadOnlyList<Group>> GetAllAsync(CancellationToken cancellationToken);

    Task<Group?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    Task<Group> UpsertAsync(
        Group group,
        CancellationToken cancellationToken);

    Task<Group?> DeleteByIdAsync(
        Guid id,
        CancellationToken cancellationToken);
}
