using Confix.Authentication.Authorization;
using Confix.Authoring.Store;

namespace Confix.Authoring;

internal sealed class ApplicationAuthorizationRule : AuthorizationRule<Application>
{
    public ApplicationAuthorizationRule(ISessionAccessor accessor) : base(accessor)
    {
    }

    protected override ValueTask<bool> IsAuthorizedAsync(
        Application resource,
        ISession session,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        return new ValueTask<bool>(
            session.HasPermission(resource.Namespace, Scope.Application, permissions));
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
