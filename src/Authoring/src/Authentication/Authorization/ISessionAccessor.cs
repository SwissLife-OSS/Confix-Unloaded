namespace Confix.Authentication.Authorization;

public interface ISessionAccessor
{
    ValueTask<ISession?> GetSession(CancellationToken cancellationToken);
}
