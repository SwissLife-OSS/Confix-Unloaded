namespace Confix.Authentication.Authorization;

public static class SessionAccessorExtensions
{
    public static async Task<bool> HasPermission(
        this ISessionAccessor accessor,
        string @namespace,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        var session = await accessor.GetSession(cancellationToken);

        return session?.HasPermission(@namespace, permissions) is true;
    }
}
