namespace Confix.Authentication.Authorization;

public interface IAuthorizationService
{
    ValueTask<bool> IsAuthorized<T>(T resource, CancellationToken cancellationToken);
}
