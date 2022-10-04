using Confix.Common.Exceptions;

namespace Confix.Authentication.Authorization;

public static class AuthorizationRuleExtensions
{
    public static async ValueTask<T?> AuthorizeOrNullAsync<T>(
        this IAuthorizationRule<T> rule,
        T? resource,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        if (await rule.IsAuthorizedAsync(resource, permissions, cancellationToken))
        {
            return resource;
        }

        return default;
    }
}

