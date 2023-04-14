using Microsoft.Extensions.Configuration;

namespace Confix.Value.Configuration;

public sealed class VaultConfigurationSource : IConfigurationSource
{
    public ApplicationPart Part { get; }

    public VaultConfigurationSource(ApplicationPart part)
    {
        Part = part;
    }

    public IConfigurationProvider Build(IConfigurationBuilder builder)
        => new VaultConfigurationProvider(this);
}
