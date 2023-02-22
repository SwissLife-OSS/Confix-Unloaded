using Microsoft.Extensions.Configuration;

namespace ConfiX;

public sealed class VaultConfigurationSource : IConfigurationSource
{
    public ApplicationPart Part { get; }

    public VaultConfigurationSource(ApplicationPart part)
    {
        Part = part;
    }

    public IConfigurationProvider Build(IConfigurationBuilder builder)
    {
        return new VaultConfigurationProvider(this);
    }
}
