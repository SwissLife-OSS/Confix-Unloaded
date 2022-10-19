using Microsoft.Extensions.DependencyInjection;

namespace Confix.CryptoProviders;

public sealed class CryptoProviderDescriptor : ICryptoProviderDescriptor
{
    public CryptoProviderDescriptor(IServiceCollection services)
    {
        Services = services;
    }

    public IServiceCollection Services { get; }
}
