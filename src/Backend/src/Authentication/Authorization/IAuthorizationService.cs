namespace Confix.Authentication.Authorization;

public interface IAuthorizationService
{
    IAuthorizationRule<T> RuleFor<T>();

    ValueTask<bool> IsAuthenticatedAsync(CancellationToken cancellationToken);

    ValueTask<ISession> EnsureAuthenticated(CancellationToken cancellationToken);
}
