using Confix.Authentication.Authorization;
using Confix.Vault.Abstractions;
using Confix.Vault.Core;
using Confix.Vault.Host;
using Microsoft.AspNetCore.Identity;

namespace Microsoft.Extensions.DependencyInjection;

public static class VaultCoreServiceCollectionExtensions
{
    public static IServiceCollection AddVaultCore(this IServiceCollection services)
    {
        services.AddSingleton<IConfigurationService, ConfigurationService>();
        services.AddSingleton<IPasswordHasher<object>, PasswordHasher<object>>();
        services.AddSingleton<ITokenProvider, TokenProvider>();
        services.AddAuthorizationAndPolicies();
        services.AddControllers();

        return services;
    }
}
