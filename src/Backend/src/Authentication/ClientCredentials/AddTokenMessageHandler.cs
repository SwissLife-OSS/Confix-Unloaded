using System.Net.Http.Headers;
using IdentityModel;
using Microsoft.Extensions.Options;

namespace Confix.Authentication;

internal class AddTokenMessageHandler : DelegatingHandler
{
    private readonly IClientCredentialCache _cache;
    private readonly string _name;
    private readonly IOptionsMonitor<ClientCredentialsClientOptions> _options;

    public AddTokenMessageHandler(
        IClientCredentialCache cache,
        IOptionsMonitor<ClientCredentialsClientOptions> options,
        string name)
    {
        _cache = cache;
        _options = options;
        _name = name;
    }

    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request,
        CancellationToken cancellationToken)
    {
        var options = _options.Get(_name);

        var token = await _cache.GetAccessTokenAsync(
            options.Authority,
            options.ClientId,
            options.Secret,
            options.Scopes,
            cancellationToken);

        request.Headers.Authorization =
            new AuthenticationHeaderValue(
                OidcConstants.AuthenticationSchemes.AuthorizationHeaderBearer,
                token);

        return await base.SendAsync(request, cancellationToken);
    }
}
