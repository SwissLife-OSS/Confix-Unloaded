using Confix.CryptoProviders;
using Confix.Vault;

namespace Microsoft.Extensions.DependencyInjection;

public static class VaultServerBuilderExtensions
{
    public static IVaultServerBuilder ConfigureEncryption(
        this IVaultServerBuilder builder,
        Action<ICryptoProviderDescriptor> configure)
    {
        configure(new CryptoProviderDescriptor(builder.Services));

        return builder;
    }
}
