using Confix.Authentication.ApiKey;
using Confix.Authentication.Authorization;
using static Confix.Authentication.Authorization.Permissions;
using static Confix.Authentication.Authorization.WellKnownNamespaces;

namespace Confix.Authoring.ApiKeys.Authorization;

internal sealed class ApiKeyAuthorizationRule : AuthorizationRule<ApiKey>
{
    public ApiKeyAuthorizationRule(ISessionAccessor accessor) : base(accessor)
    {
    }

    protected override ValueTask<bool> IsAuthorizedAsync(
        ApiKey resource,
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
