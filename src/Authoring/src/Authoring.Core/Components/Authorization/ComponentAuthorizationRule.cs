using Confix.Authentication.Authorization;

namespace Confix.Authoring.Components.Authorization;

public class ComponentAuthorizationRule : AuthorizationRule<Component>
{
    public ComponentAuthorizationRule(ISessionAccessor accessor) : base(accessor)
    {
    }

    protected override ValueTask<bool> IsAuthorizedAsync(
        Component resource,
        ISession session,
        CancellationToken cancellationToken)
    {
        return new ValueTask<bool>(
            session.HasPermission(resource.Namespace, Permissions.ReadComponents));
    }
}
