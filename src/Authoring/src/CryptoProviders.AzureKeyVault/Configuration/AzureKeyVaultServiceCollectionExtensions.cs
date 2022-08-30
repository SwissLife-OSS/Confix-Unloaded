using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.CryptoProviders.AzureKeyVault;

public static class AzureKeyVaultServiceCollectionExtensions
{
    public static IServiceCollection AddKeyVaultSecrets(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        AzureKeyVaultOptions options = configuration
            .GetSection("Confix:AzureKeyVault")
            .Get<AzureKeyVaultOptions>();

        services.Configure<AzureKeyVaultOptions>(x =>
        {
            x.Algorithm = options.Algorithm;
            x.Url = options.Url;
        });
        services.AddSingleton<IKeyCache, KeyCache>();
        services.AddSingleton<IKeyProvider, KeyVaultKeyProvider>();
        services.AddSingleton<ICryptographyClientFactory, CryptographyClientFactory>();
        services.AddSingleton<KeyVaultCryptoProvider>();
        services.AddSingleton<IEncryptor>(sp => sp.GetRequiredService<KeyVaultCryptoProvider>());
        services.AddSingleton<IDecryptor>(sp => sp.GetRequiredService<KeyVaultCryptoProvider>());

        return services;
    }
}
