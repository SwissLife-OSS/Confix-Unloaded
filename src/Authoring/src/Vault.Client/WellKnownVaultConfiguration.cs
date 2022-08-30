namespace Confix.Vault.Client;

internal class WellKnownVaultConfiguration
{
    public const string Vault = nameof(Vault);

    public const string Url = $"{Vault}:{nameof(Url)}";
}
