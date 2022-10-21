using Confix.Common;
using Confix.CryptoProviders.AzureKeyVault;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.CryptoProviders;

public static class AzureKeyVaultServiceCollectionExtensions
{
    public static ICryptoProviderDescriptor UseAzureKeyVaultKeyEncryptionKeys(
        this ICryptoProviderDescriptor services,
        string pathToConfig = Settings.Confix.Encryption.KeyEncryptionKey.AzureKeyVault.Section)
    {
        services.Services
            .AddOptions<AzureKeyVaultOptions>()
            .BindConfiguration(pathToConfig);

        services.Services.AddSingleton<IKeyEncryptionKeyCache, KeyEncryptionKeyCache>();
        services.Services.AddSingleton<IKeyEncryptionKeyProvider, KeyEncryptionKeyProvider>();
        services.Services.AddSingleton<ICryptographyClientFactory, CryptographyClientFactory>();
        services.Services.AddSingleton<KeyVaultCryptoProvider>();
        services.Services
            .AddSingleton<IEncryptor>(sp => sp.GetRequiredService<KeyVaultCryptoProvider>());
        services.Services
            .AddSingleton<IDecryptor>(sp => sp.GetRequiredService<KeyVaultCryptoProvider>());

        return services;
    }
}
