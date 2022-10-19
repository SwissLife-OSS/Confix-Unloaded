using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Vault.Client;

public static class VaultClientServiceCollectionExtensions
{
    public static IServiceCollection AddVaultClient(this IServiceCollection services)
    {
        services.AddSingleton<IVaultClient, VaultClient>();

        return services;
    }
}
