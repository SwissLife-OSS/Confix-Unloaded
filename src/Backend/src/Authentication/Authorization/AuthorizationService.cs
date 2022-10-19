using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authentication.Authorization;

public class AuthorizationService : IAuthorizationService
{
    private readonly ISessionAccessor _accessor;
    private readonly IServiceProvider _provider;

    public AuthorizationService(IServiceProvider provider, ISessionAccessor accessor)
    {
        _provider = provider;
        _accessor = accessor;
    }

    public IAuthorizationRule<T> RuleFor<T>()
    {
        return _provider.GetService<IAuthorizationRule<T>>() ??
            throw new InvalidOperationException($"No rule found for {typeof(T).Name}");
    }

    public async ValueTask<bool> IsAuthenticatedAsync(CancellationToken cancellationToken)
    {
        return await _accessor.GetSession(cancellationToken) is not null;
    }

    public async ValueTask<ISession> EnsureAuthenticated(CancellationToken cancellationToken)
    {
        return await _accessor.GetSession(cancellationToken) ??
            throw new UnauthorizedAccessException();
    }
}
