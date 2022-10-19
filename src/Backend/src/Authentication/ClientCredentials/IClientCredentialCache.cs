namespace Confix.Authentication;

public interface IClientCredentialCache
{
    ValueTask<string> GetAccessTokenAsync(
        string authority,
        string clientId,
        string clientSecret,
        string scopes,
        CancellationToken cancellationToken);
}
