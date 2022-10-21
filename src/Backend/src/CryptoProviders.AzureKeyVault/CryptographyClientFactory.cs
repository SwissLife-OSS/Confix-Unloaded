using Azure.Identity;
using Azure.Security.KeyVault.Keys;
using Azure.Security.KeyVault.Keys.Cryptography;
using Microsoft.Extensions.Options;

namespace Confix.CryptoProviders.AzureKeyVault;

internal sealed class CryptographyClientFactory : ICryptographyClientFactory
{
    private readonly IOptionsMonitor<AzureKeyVaultOptions> _options;

    public CryptographyClientFactory(IOptionsMonitor<AzureKeyVaultOptions> options)
    {
        _options = options;
    }

    private ClientSecretCredential Credentials => new(
        _options.CurrentValue.TenantId,
        _options.CurrentValue.ClientId,
        _options.CurrentValue.ClientSecret);

    public CryptographyClient CreateCryptoClient(string keyId)
    {
        return new CryptographyClient(
            new Uri($"{_options.CurrentValue.Url.Trim('/')}/keys/{keyId}"),
            Credentials);
    }

    public KeyClient CreateKeyClient(string keyId)
    {
        return new KeyClient(new Uri(_options.CurrentValue.Url), Credentials);
    }
}
