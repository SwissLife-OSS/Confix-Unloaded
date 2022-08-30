using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Vault.Client;

public static class VaultClientServiceCollectionExtensions
{
    public static IServiceCollection AddVaultClient(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        string url = configuration[WellKnownVaultConfiguration.Url];
        if (string.IsNullOrWhiteSpace(url))
        {
            throw new ArgumentException(
                $"{WellKnownVaultConfiguration.Url} was not defined.",
                nameof(configuration));
        }

        return services.AddVaultClient(url);
    }

    public static IServiceCollection AddVaultClient(
        this IServiceCollection services,
        string requestUri)
    {
        services.Configure<VaultClientOptions>(x =>
        {
            x.RequestUri = requestUri;
        });
        services.AddHttpClient();
        services.AddSingleton<IVaultClient, VaultClient>();

        return services;
    }
}
