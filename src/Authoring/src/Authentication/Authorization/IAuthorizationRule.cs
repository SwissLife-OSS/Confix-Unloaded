namespace Confix.Authentication.Authorization;

public interface IAuthorizationRule<in T>
{
    ValueTask<bool> IsAuthorizedAsync(
        T? resource,
        Permissions permissions,
        CancellationToken cancellationToken);
}
