using Confix.Authentication.ApiKey;
using Confix.Authentication.Authorization;
using Confix.Authoring.ApiKeys.Authorization;
using Confix.Common.Token;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.ApiKeys;

public static class ApiKeyRequestExecutorBuilderExtensions
{
    public static IServiceCollection AddApiKeys(this IServiceCollection services)
    {
        services.AddAuthorizationRule<ApiKey, ApiKeyAuthorizationRule>();
        services.AddTokenProvider();
        services.AddScoped<IApiKeyProvider, ApiKeyProvider>();
        services.AddScoped<IApiKeyService, ApiKeyService>();

        return services;
    }
}
