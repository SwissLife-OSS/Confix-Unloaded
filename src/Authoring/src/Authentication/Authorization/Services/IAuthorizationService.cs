namespace Confix.Authentication.Authorization;

public interface IAuthorizationService
{
    ValueTask<bool> IsAuthorized<T>(
        T resource,
        Permissions permissions,
        CancellationToken cancellationToken);

    ValueTask<bool> IsAuthorized<T>(
        Guid resourceId,
        Permissions permissions,
        CancellationToken cancellationToken);
}
