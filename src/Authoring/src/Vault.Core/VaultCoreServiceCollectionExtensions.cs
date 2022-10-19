using Confix.Vault.Abstractions;
using Confix.Vault.Core;
using Confix.Vault.Host;
using Microsoft.AspNetCore.Routing;

namespace Microsoft.Extensions.DependencyInjection;

public static class VaultCoreServiceCollectionExtensions
{
    public static IServiceCollection AddVaultCore(this IServiceCollection services)
    {
        services.AddSingleton<IConfigurationService, ConfigurationService>();
        services.AddSingleton<ITokenProvider, TokenProvider>();
        services.AddControllers();

        return services;
    }
}
