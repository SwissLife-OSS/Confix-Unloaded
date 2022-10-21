namespace Confix.CryptoProviders.AzureKeyVault;

public sealed class AzureKeyVaultOptions
{
    public string Url { get; set; } = default!;

    public string Algorithm { get; set; } = "RSA-OAEP-256";

    public string TenantId { get; set; } = default!;

    public string ClientId { get; set; } = default!;

    public string ClientSecret { get; set; } = default!;
}
