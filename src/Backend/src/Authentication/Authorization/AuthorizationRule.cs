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
