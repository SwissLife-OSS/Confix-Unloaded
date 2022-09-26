using Confix.Authentication.Authorization;

namespace Confix.Authoring.Variables;

public class VariableAuthorizationRule : AuthorizationRule<Variable>
{
    public VariableAuthorizationRule(ISessionAccessor accessor) : base(accessor)
    {
    }

    protected override ValueTask<bool> IsAuthorizedAsync(
        Variable resource,
        ISession session,
        CancellationToken cancellationToken)
    {
        return new ValueTask<bool>(
            session.HasPermission(resource.Namespace, Permissions.ReadVariables));
    }
}
