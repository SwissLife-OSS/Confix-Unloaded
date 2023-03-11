using Confix.Authentication.Authorization;

namespace Confix.Authoring.Components.Authorization;

internal sealed class ComponentAuthorizationRule : AuthorizationRule<Component>
{
    public ComponentAuthorizationRule(ISessionAccessor accessor) : base(accessor)
    {
    }

    protected override ValueTask<bool> IsAuthorizedAsync(
        Component resource,
        ISession session,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        return new ValueTask<bool>(
            resource.Scopes.Any(x
                => session.HasPermission(x.Namespace, Scope.Component, permissions)));
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
