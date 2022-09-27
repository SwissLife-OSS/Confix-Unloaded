using Confix.Authentication.Authorization;

namespace Confix.Authoring.Environement.Authorization;

public class EnvironmentAuthorizationRule : AuthorizationRule<Environment>
{
    public EnvironmentAuthorizationRule(ISessionAccessor accessor) : base(accessor)
    {
    }

    protected override ValueTask<bool> IsAuthorizedAsync(
        Environment resource,
        ISession session,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        return new ValueTask<bool>(
            session.HasPermission(WellKnownNamespaces.Global, Scope.Environment, permissions));
    }
}
