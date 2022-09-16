using Confix.Authentication.Authorization;
using Confix.Authoring.Store;
using static Confix.Authentication.Authorization.Permissions;

namespace Confix.Authoring;

public class ApplicationAuthorizationRule : AuthorizationRule<Application>
{
    public ApplicationAuthorizationRule(ISessionAccessor accessor) : base(accessor)
    {
    }

    protected override ValueTask<bool> IsAuthorizedAsync(
        Application resource,
        ISession session,
        CancellationToken cancellationToken)
    {
        return new ValueTask<bool>(session.HasPermission(resource.Namespace, ReadConfiguration));
    }
}
