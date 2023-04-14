using System.Security.Claims;
using System.Text.Encodings.Web;
using IdentityModel;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using static Confix.Authentication.ApiKey.ApiKeyDefaults;

namespace Confix.Authentication.ApiKey;

/// <summary>
/// Inherited from <see cref="AuthenticationHandler{TOptions}"/> for api key authentication.
/// </summary>
internal class ApiKeyHandler : AuthenticationHandler<ApiKeyOptions>
{
    private readonly IApiKeyProvider _apiKeyProvider;

    public ApiKeyHandler(
        IOptionsMonitor<ApiKeyOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock,
        IApiKeyProvider apiKeyProvider)
        : base(options, logger, encoder, clock)
    {
        _apiKeyProvider = apiKeyProvider;
    }

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (!Context.Request.Headers.TryGetValue(HeaderName, out StringValues value) ||
            value.FirstOrDefault() is not { } apiKey)
        {
            Logger.LogInformation("No Api Key found in the request.");
            return AuthenticateResult.NoResult();
        }

        try
        {
            var validatedApiKey =
                await _apiKeyProvider.ProvideAsync(apiKey, Context.RequestAborted);

            if (validatedApiKey is null)
            {
                Logger.LogError("Api key invalid");
                return AuthenticateResult.Fail("Api key invalid");
            }

            return RaiseAndHandleAuthenticationSucceededAsync(validatedApiKey);
        }
        catch (Exception exception)
        {
            Logger.LogError(exception, "Error while validating API key");
            throw;
        }
    }

    private AuthenticateResult RaiseAndHandleAuthenticationSucceededAsync(ApiKey apiKey)
    {
        // ..create claims principal.
        var principal = BuildClaimsPrincipal(apiKey);

        // Raise authentication succeeded event.
        var authenticationSucceededContext =
            new ApiKeyAuthenticationSucceededContext(Context, Scheme, Options, principal);

        if (authenticationSucceededContext.Principal?.Identity != null &&
            authenticationSucceededContext.Principal.Identity.IsAuthenticated)
        {
            authenticationSucceededContext.Success();
            return authenticationSucceededContext.Result;
        }

        Logger.LogError("No authenticated prinicipal set.");
        return AuthenticateResult.Fail("No authenticated prinicipal set.");
    }

    private ClaimsPrincipal BuildClaimsPrincipal(ApiKey apiKey)
    {
        var claimsList = new List<Claim>
        {
            new(ApiKeyClaim, apiKey.Id.ToString(ApiKeyIdSerializationType)),
            new(ClaimTypes.NameIdentifier, "API Key: " + apiKey.Id)
        };

        return new ClaimsPrincipal(new ClaimsIdentity(claimsList, Scheme.Name));
    }
}
