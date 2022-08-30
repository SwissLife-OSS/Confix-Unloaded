using System.ComponentModel.Design;
using Confix.Vault.Core;

namespace Microsoft.Extensions.DependencyInjection;

public static class VaultServiceCollectionExtensions
{
    public static IServiceCollection AddVaultCore(this IServiceCollection services)
    {
        services.AddSingleton<IEncryptionProvider, EncryptionProvider>();
        services.AddSingleton<IConfigurationService, ConfigurationService>();
        return services;
    }
}
