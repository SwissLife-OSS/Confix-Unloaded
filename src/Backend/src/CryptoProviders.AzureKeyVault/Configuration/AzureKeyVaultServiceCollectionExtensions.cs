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
        services.Services.AddSingleton<IEncryptionKeyProvider, EncryptionKeyProvider>();
        services.Services.AddSingleton<ICryptographyClientFactory, CryptographyClientFactory>();
        services.Services.AddSingleton<EncryptionKeyCryptoProvider>();
        services.Services
            .AddSingleton<IEncryptor>(sp => sp.GetRequiredService<EncryptionKeyCryptoProvider>());
        services.Services
            .AddSingleton<IDecryptor>(sp => sp.GetRequiredService<EncryptionKeyCryptoProvider>());

        return services;
    }
}
