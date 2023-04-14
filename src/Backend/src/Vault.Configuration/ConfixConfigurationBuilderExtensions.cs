using Confix.Value.Configuration;

namespace Microsoft.Extensions.Configuration;

public static class ConfixConfigurationBuilderExtensions
{
    public static IConfigurationBuilder AddVaultConfiguration(
        this IConfigurationBuilder builder,
        string appName,
        string partName)
        => builder.AddVaultConfiguration(new ApplicationPart(appName, partName));

    private static IConfigurationBuilder AddVaultConfiguration(
        this IConfigurationBuilder builder,
        ApplicationPart part)
    {
        builder.Add(new VaultConfigurationSource(part));

        return builder;
    }
}
