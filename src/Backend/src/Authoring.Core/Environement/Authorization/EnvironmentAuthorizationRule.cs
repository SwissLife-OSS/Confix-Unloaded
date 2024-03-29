using Confix.Authentication.Authorization;

namespace Confix.Authoring.Environement.Authorization;

internal sealed class EnvironmentAuthorizationRule : AuthorizationRule<Environment>
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

    protected override ValueTask<bool> IsAuthorizedFromAsync<TOther>(
        TOther resource,
        ISession session,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        return new ValueTask<bool>(
            session.HasPermission(WellKnownNamespaces.Global, Scope.Environment, permissions));
    }
}
