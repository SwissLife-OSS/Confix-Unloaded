using Confix.Vault;

namespace Microsoft.Extensions.DependencyInjection;

public static class VaultServiceCollectionExtensions
{
    public static IVaultServerBuilder AddConfixVaultServer(this IServiceCollection services)
    {
        var builder = new VaultServerBuilder(services);
        builder.Services.AddVaultCore();

        return builder;
    }
}
