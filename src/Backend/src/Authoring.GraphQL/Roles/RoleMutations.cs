using Confix.Authentication.Authorization;
using Confix.Common.Exceptions;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(OperationTypeNames.Mutation)]
public sealed class RoleMutations
{
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Role> CreateRoleAsync(
        [Service] IRoleService roleService,
        string name,
        IReadOnlyList<Permission> permissions,
        CancellationToken cancellationToken)
    {
        return await roleService.CreateAsync(name, permissions, cancellationToken);
    }

    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Role> RenameRoleAsync(
        [Service] IRoleService roleService,
        [ID(nameof(Role))] Guid id,
        string name,
        CancellationToken cancellationToken)
    {
        return await roleService.RenameRoleAsync(id, name, cancellationToken);
    }

    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Role> ChangeRolePermissionsAsync(
        [Service] IRoleService roleService,
        [ID(nameof(Role))] Guid id,
        IReadOnlyList<Permission> permissions,
        CancellationToken cancellationToken)
    {
        return await roleService.UpdateRolePermissionsAsync(id, permissions, cancellationToken);
    }

    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Role?> RemoveRoleByIdAsync(
        [Service] IRoleService roleService,
        [ID(nameof(Role))] Guid id,
        CancellationToken cancellationToken)
    {
        return await roleService.DeleteByIdAsync(id, cancellationToken);
    }
}
