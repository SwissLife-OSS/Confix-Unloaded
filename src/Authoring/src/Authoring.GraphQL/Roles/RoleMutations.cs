using Confix.Authentication.Authorization;
using Confix.Authoring.GraphQL.Applications;
using Confix.Common.Exceptions;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(OperationTypeNames.Mutation)]
public class RoleMutations
{
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Role> CreateRoleAsync(
        [Service] IRoleService roleService,
        string name,
        IReadOnlyList<Permission> permissions,
        CancellationToken cancellationToken)
        => await roleService.CreateAsync(name, permissions, cancellationToken);

    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Role> RenameRoleAsync(
        [Service] IRoleService roleService,
        [ID(nameof(Role))] Guid id,
        string name,
        CancellationToken cancellationToken)
        => await roleService.RenameRoleAsync(id, name, cancellationToken);

    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Role> ChangeRolePermissionsAsync(
        [Service] IRoleService roleService,
        [ID(nameof(Role))] Guid id,
        IReadOnlyList<Permission> permissions,
        CancellationToken cancellationToken)
        => await roleService.UpdateRolePermissionsAsync(id, permissions, cancellationToken);

    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Role?> RemoveRoleByIdAsync(
        [Service] IRoleService roleService,
        [ID(nameof(Role))] Guid id,
        CancellationToken cancellationToken)
        => await roleService.DeleteByIdAsync(id, cancellationToken);
}
