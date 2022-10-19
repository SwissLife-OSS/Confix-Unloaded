using System.Security.Authentication;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authentication.Authorization;

public abstract class AuthorizationRule<T> : IAuthorizationRule<T>
{
    private readonly ISessionAccessor _accessor;

    protected AuthorizationRule(ISessionAccessor accessor)
    {
        _accessor = accessor;
    }

    public async ValueTask<bool> IsAuthorizedFromAsync<TOther>(
        TOther? resource,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        if (resource is null)
        {
            return default;
        }

        var session = await _accessor.GetSession(cancellationToken);
        if (session is null)
        {
            return default;
        }

        return await IsAuthorizedFromAsync(resource, session, permissions, cancellationToken);
    }

    public async ValueTask<bool> IsAuthorizedAsync(
        T? resource,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        if (resource is null)
        {
            return default;
        }

        var session = await _accessor.GetSession(cancellationToken);
        if (session is null)
        {
            return default;
        }

        return await IsAuthorizedAsync(resource, session, permissions, cancellationToken);
    }

    protected abstract ValueTask<bool> IsAuthorizedAsync(
        T resource,
        ISession session,
        Permissions permissions,
        CancellationToken cancellationToken);

    protected abstract ValueTask<bool> IsAuthorizedFromAsync<TOther>(
        TOther resource,
        ISession session,
        Permissions permissions,
        CancellationToken cancellationToken);
}

public interface IAuthorizationService
{
    IAuthorizationRule<T> RuleFor<T>();

    ValueTask<bool> IsAuthenticatedAsync(CancellationToken cancellationToken);

    ValueTask<ISession> EnsureAuthenticated(CancellationToken cancellationToken);
}

public class AuthorizationService : IAuthorizationService
{
    private readonly IServiceProvider _provider;
    private readonly ISessionAccessor _accessor;

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
        => await _accessor.GetSession(cancellationToken) is not null;

    public async ValueTask<ISession> EnsureAuthenticated(CancellationToken cancellationToken)
    {
        return await _accessor.GetSession(cancellationToken) ??
            throw new UnauthorizedAccessException();
    }
}
