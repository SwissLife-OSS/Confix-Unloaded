using Confix.Authentication.Authorization;
using static Confix.Authentication.Authorization.Permissions;
using static Confix.Authentication.Authorization.WellKnownNamespaces;

namespace Confix.Authoring.Groups.Authorization;

internal sealed class GroupAuthorizationRule : AuthorizationRule<Group>
{
    public GroupAuthorizationRule(ISessionAccessor accessor) : base(accessor)
    {
    }

    protected override ValueTask<bool> IsAuthorizedAsync(
        Group resource,
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
