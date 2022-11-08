using Microsoft.AspNetCore.Authentication;

namespace Confix.Authentication.ApiKey;

public static class ApiKeyExtensions
{
    public static AuthenticationBuilder AddApiKey(this AuthenticationBuilder builder)
    {
        return builder.AddScheme<ApiKeyOptions, ApiKeyHandler>(
            ApiKeyDefaults.AuthenticationScheme,
            "Api Key",
            null);
    }
}
