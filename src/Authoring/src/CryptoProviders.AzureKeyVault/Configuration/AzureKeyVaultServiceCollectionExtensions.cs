using Confix.Common;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.CryptoProviders.AzureKeyVault;

public static class AzureKeyVaultServiceCollectionExtensions
{
    public static ICryptoProviderDescriptor UseAzureKeyVaultKeyEncryptionKeys(
        this ICryptoProviderDescriptor services,
        string pathToConfig = Settings.Confix.Encryption.KeyEncryptionKey.AzureKeyVault.Section)
    {
        services.Services
            .AddOptions<AzureKeyVaultOptions>()
            .BindConfiguration(pathToConfig);

        services.Services.AddSingleton<IKeyCache, KeyCache>();
        services.Services.AddSingleton<IKeyProvider, KeyVaultKeyProvider>();
        services.Services.AddSingleton<ICryptographyClientFactory, CryptographyClientFactory>();
        services.Services.AddSingleton<KeyVaultCryptoProvider>();
        services.Services
            .AddSingleton<IEncryptor>(sp => sp.GetRequiredService<KeyVaultCryptoProvider>());
        services.Services
            .AddSingleton<IDecryptor>(sp => sp.GetRequiredService<KeyVaultCryptoProvider>());

        return services;
    }
}
