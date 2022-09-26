namespace Confix.Authentication.Authorization;

public interface IAuthorizationService
{
    ValueTask<bool> IsAuthorized<T>(T resource, CancellationToken cancellationToken);

    ValueTask<bool> IsAuthorized<T>(Guid resourceId, CancellationToken cancellationToken);
}
