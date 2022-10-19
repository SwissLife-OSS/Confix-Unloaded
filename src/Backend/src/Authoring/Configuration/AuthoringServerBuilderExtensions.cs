using Confix.Authentication;
using Confix.Common;
using Confix.CryptoProviders;
using Confix.Vault.Client;

namespace Confix.Authoring;

public static class AuthoringServerBuilderExtensions
{
    public static IAuthoringServerBuilder ConfigureEncryption(
        this IAuthoringServerBuilder builder,
        Action<ICryptoProviderDescriptor> configure)
    {
        configure(new CryptoProviderDescriptor(builder.Services));

        return builder;
    }

    public static IAuthoringServerBuilder AddVaultHttpClient(
        this IAuthoringServerBuilder builder,
        string pathToConfig = Settings.Confix.Authoring.Vault.HttpClient.Section)
    {
        builder.Services.AddClientCredentialsClient(VaultClient.HttpClientName, pathToConfig);

        return builder;
    }
}
