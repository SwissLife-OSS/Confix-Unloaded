namespace Confix.Authentication.Authorization;

public interface IGroupService
{
    Task<Group> CreateAsync(
        string name,
        IEnumerable<Requirement> requirements,
        IEnumerable<RoleScope> roles,
        CancellationToken cancellationToken);

    Task<Group> RenameGroupAsync(Guid id, string name, CancellationToken cancellationToken);

    Task<Group> UpdateGroupRequirementsAsync(
        Guid id,
        IEnumerable<Requirement> requirements,
        CancellationToken cancellationToken);

    Task<Group> UpdateGroupRolesAsync(
        Guid id,
        IEnumerable<RoleScope> roles,
        CancellationToken cancellationToken);

    Task<Group?> DeleteByIdAsync(Guid id, CancellationToken cancellationToken);

    Task<IQueryable<Group>> SearchGroupAsync(string? name, CancellationToken cancellationToken);

    Task<Group?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
}
