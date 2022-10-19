namespace Confix.CryptoProviders.AzureKeyVault;

public sealed class AzureKeyVaultOptions
{
    public string Url { get; set; } = default!;

    public string Algorithm { get; set; } = "RSA-OAEP-256";
}
