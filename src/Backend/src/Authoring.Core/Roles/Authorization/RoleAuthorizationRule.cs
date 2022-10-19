using Confix.Authentication.Authorization;
using static Confix.Authentication.Authorization.Permissions;
using static Confix.Authentication.Authorization.WellKnownNamespaces;

namespace Confix.Authoring.Roles.Authorization;

internal sealed class RoleAuthorizationRule : AuthorizationRule<Role>
{
    public RoleAuthorizationRule(ISessionAccessor accessor) : base(accessor)
    {
    }

    protected override ValueTask<bool> IsAuthorizedAsync(
        Role resource,
        ISession session,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        if ((permissions & (Read | Write)) == 0)
        {
            return new ValueTask<bool>(false);
        }

        return new ValueTask<bool>(session.HasPermission(Global, Scope.Identity, permissions));
    }

    protected override ValueTask<bool> IsAuthorizedFromAsync<TOther>(
        TOther resource,
        ISession session,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        return new ValueTask<bool>(false);
    }
}
