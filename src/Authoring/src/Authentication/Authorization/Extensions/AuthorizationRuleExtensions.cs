using System.Runtime.CompilerServices;
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

    public static async IAsyncEnumerable<T> AuthorizeAndFilterAsync<T>(
        this IAuthorizationRule<T> rule,
        IEnumerable<T?> resources,
        Permissions permissions,
        [EnumeratorCancellation] CancellationToken cancellationToken)
    {
        foreach (var resource in resources)
        {
            if (resource is { } &&
                await rule.IsAuthorizedAsync(resource, permissions, cancellationToken))
            {
                yield return resource;
            }
        }
    }
}
