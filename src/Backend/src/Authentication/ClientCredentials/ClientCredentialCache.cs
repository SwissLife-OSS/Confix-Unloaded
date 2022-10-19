using System.Security.Authentication;
using IdentityModel.Client;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;

namespace Confix.Authentication;

public class ClientCredentialCache : IClientCredentialCache
{
    internal const string ClientName = "ClientCredentials";

    private readonly IMemoryCache _cache;
    private readonly IHttpClientFactory _clientFactory;
    private readonly ILogger<ClientCredentialCache> _logger;

    public ClientCredentialCache(
        IHttpClientFactory clientFactory,
        IMemoryCache cache,
        ILogger<ClientCredentialCache> logger)
    {
        _clientFactory = clientFactory;
        _cache = cache;
        _logger = logger;
    }

    public async ValueTask<string> GetAccessTokenAsync(
        string authority,
        string clientId,
        string clientSecret,
        string scopes,
        CancellationToken cancellationToken)
    {
        var cacheKey = "access_token." + string.Join("-", authority, clientId, scopes);

        if (_cache.Get(cacheKey) is AuthenticationToken token &&
            token.ExpiresAt > DateTime.UtcNow.AddMinutes(1))
        {
            _logger.LogInformation("Retrieved token from cache {cacheKey}", cacheKey);

            return token.AccessToken;
        }

        using var client = _clientFactory.CreateClient(ClientName);

        var discoveryDocument =
            await client.GetDiscoveryDocumentAsync(authority, cancellationToken);

        if (discoveryDocument.IsError)
        {
            throw new AuthenticationException($"Could not get discovery document: {authority}");
        }

        var requestStartTime = DateTime.UtcNow;
        ClientCredentialsTokenRequest request = new()
        {
            Address = discoveryDocument.TokenEndpoint,
            ClientId = clientId,
            ClientSecret = clientSecret.ValueOrNull(),
            Scope = scopes.ValueOrNull()
        };

        var response = await client.RequestClientCredentialsTokenAsync(request, cancellationToken);

        if (response.IsError || string.IsNullOrEmpty(response.AccessToken))
        {
            throw new AuthenticationException($"Could not authenticate with client {clientId}");
        }

        token = new AuthenticationToken(response.AccessToken,
            requestStartTime.AddSeconds(response.ExpiresIn));
        _cache.Set(cacheKey, token, token.ExpiresAt);
        _logger.LogInformation("Add token to cache with {cacheKey}", cacheKey);

        return token.AccessToken;
    }

    public class AuthenticationToken
    {
        public AuthenticationToken(string accessToken, DateTime expiresAt)
        {
            AccessToken = accessToken;
            ExpiresAt = expiresAt;
        }

        public string AccessToken { get; }

        public DateTime ExpiresAt { get; }
    }
}
