namespace Confix.CryptoProviders.AzureKeyVault;

public class AzureKeyVaultOptions
{
    public string Url { get; set; } = default!;

    public string Algorithm { get; set; } = "RSA-OAEP-256";
}
