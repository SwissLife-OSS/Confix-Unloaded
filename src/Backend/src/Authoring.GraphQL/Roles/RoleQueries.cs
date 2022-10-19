using Confix.Authentication.Authorization;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(OperationTypeNames.Query)]
public sealed class RoleQueries
{
    [UsePaging]
    public Task<IQueryable<Role>> SearchRoles(
        [Service] IRoleService roleService,
        string? search,
        CancellationToken cancellationToken)
    {
        return roleService.SearchRoleAsync(search, cancellationToken);
    }

    public Task<Role?> GetRoleByIdAsync(
        [Service] IRoleService roleService,
        [ID(nameof(Role))] Guid id,
        CancellationToken cancellationToken)
    {
        return roleService.GetByIdAsync(id, cancellationToken);
    }
}
