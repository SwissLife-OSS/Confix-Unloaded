namespace Confix.Authentication.Authorization;

public static class SessionAccessorExtensions
{
    public static async Task<bool> IsAuthenticated(
        this ISessionAccessor accessor,
        CancellationToken cancellationToken)
    {
        var session = await accessor.GetSession(cancellationToken);

        return session is not null;
    }
}
