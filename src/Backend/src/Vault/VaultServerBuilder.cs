using Confix.Vault;

namespace Microsoft.Extensions.DependencyInjection;

internal sealed class VaultServerBuilder : IVaultServerBuilder
{
    public VaultServerBuilder(IServiceCollection services)
    {
        Services = services;
    }

    public IServiceCollection Services { get; }
}
