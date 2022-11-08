using Confix.Authentication.Authorization;
using Confix.Common.Token;
using Confix.Vault.Abstractions;
using Confix.Vault.Core;

namespace Microsoft.Extensions.DependencyInjection;

public static class VaultCoreServiceCollectionExtensions
{
    public static IServiceCollection AddVaultCore(this IServiceCollection services)
    {
        services.AddSingleton<IConfigurationService, ConfigurationService>();
        services.AddTokenProvider();
        services.AddAuthorizationAndPolicies();
        services.AddControllers();

        return services;
    }
}
