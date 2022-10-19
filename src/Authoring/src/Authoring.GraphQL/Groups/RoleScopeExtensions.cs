using Confix.Authentication.Authorization;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(typeof(RoleScope))]
public sealed class RoleScopeExtensions
{
    [BindMember(nameof(RoleScope.RoleIds))]
    public async Task<IEnumerable<Role>> GetRolesAsync(
        [Service] IRoleService roleService,
        [Parent] RoleScope parent,
        CancellationToken cancellationToken)
    {
        return await roleService.GetByIdsAsync(parent.RoleIds, cancellationToken);
    }
}
