namespace Confix.Authentication.Authorization;

public static class AuthorizationRuleExtensions
{
    public static async ValueTask<T?> AuthorizeAsync<T>(
        this IAuthorizationRule<T> rule,
        T? resource,
        CancellationToken cancellationToken)
    {
        if (await rule.IsAuthorizedAsync(resource, cancellationToken))
        {
            return resource;
        }

        return default;
    }
}

public static class AuthorizationServiceExtensions
{
    public static async ValueTask<T?> AuthorizeAsync<T>(
        this IAuthorizationService service,
        T? resource,
        CancellationToken cancellationToken)
    {
        if (await service.IsAuthorized(resource, cancellationToken))
        {
            return resource;
        }

        return default;
    }
}
