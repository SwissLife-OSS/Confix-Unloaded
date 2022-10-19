using Confix.Authentication.Authorization;
using Confix.Authoring.GraphQL.Applications;
using Confix.Authoring.GraphQL.Transport;
using Confix.Authoring.Roles;
using Confix.Common.Exceptions;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(OperationTypeNames.Mutation)]
public sealed class GroupMutations
{
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Group> CreateGroupAsync(
        [Service] IGroupService roleService,
        string name,
        IReadOnlyList<RequirementInput> requirements,
        IReadOnlyList<RoleScope> roles,
        CancellationToken cancellationToken)
        => await roleService.CreateAsync(
            name,
            requirements.Select(x => x.Get()),
            roles,
            cancellationToken);

    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Group> RenameGroupAsync(
        [Service] IGroupService roleService,
        [ID(nameof(Group))] Guid id,
        string name,
        CancellationToken cancellationToken)
        => await roleService.RenameGroupAsync(id, name, cancellationToken);

    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Group> UpdateGroupRequirementsAsync(
        [Service] IGroupService roleService,
        [ID(nameof(Group))] Guid id,
        IReadOnlyList<RequirementInput> requirements,
        CancellationToken cancellationToken)
        => await roleService.UpdateGroupRequirementsAsync(
            id,
            requirements.Select(x => x.Get()),
            cancellationToken);

    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Group> UpdateGroupRolesAsync(
        [Service] IGroupService roleService,
        [ID(nameof(Group))] Guid id,
        IReadOnlyList<RoleScope> roles,
        CancellationToken cancellationToken)
        => await roleService.UpdateGroupRolesAsync(
            id,
            roles,
            cancellationToken);

    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Group?> RemoveGroupByIdAsync(
        [Service] IGroupService roleService,
        [ID(nameof(Group))] Guid id,
        CancellationToken cancellationToken)
        => await roleService.DeleteByIdAsync(id, cancellationToken);
}
