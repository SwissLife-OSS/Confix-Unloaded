using Microsoft.Extensions.DependencyInjection;

namespace Confix.CryptoProviders;

public interface ICryptoProviderDescriptor
{
    IServiceCollection Services { get; }
}
