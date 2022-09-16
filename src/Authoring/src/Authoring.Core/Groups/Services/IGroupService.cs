namespace Confix.Authentication.Authorization;

public interface IGroupService
{
    Task<Group> CreateAsync(
        string name,
        IReadOnlySet<Requirement> requirements,
        IReadOnlySet<RoleScope> roles,
        CancellationToken cancellationToken);

    Task<Group> UpdateAsync(
        Guid id,
        string name,
        IReadOnlySet<Requirement> requirements,
        IReadOnlySet<RoleScope> roles,
        CancellationToken cancellationToken);

    Task<Group?> DeleteByIdAsync(
        Guid id,
        CancellationToken cancellationToken);
}
