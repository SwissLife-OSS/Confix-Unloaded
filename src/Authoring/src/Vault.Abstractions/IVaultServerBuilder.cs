using Microsoft.Extensions.DependencyInjection;

namespace Confix.Vault;

public interface IVaultServerBuilder
{
    IServiceCollection Services { get; }
}
