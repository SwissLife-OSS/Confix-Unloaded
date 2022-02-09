using System;
using Azure.Identity;
using Azure.Security.KeyVault.Keys;
using Azure.Security.KeyVault.Keys.Cryptography;
using Microsoft.Extensions.Options;

namespace Confix.CryptoProviders.AzureKeyVault;

public class CryptographyClientFactory : ICryptographyClientFactory
{
    private readonly IOptionsMonitor<AzureKeyVaultOptions> _options;

    public CryptographyClientFactory(IOptionsMonitor<AzureKeyVaultOptions> options)
    {
        _options = options;
    }

    private DefaultAzureCredential Credentials => new();

    public CryptographyClient CreateCryptoClient(string keyId)
        => new(new Uri($"{_options.CurrentValue.Url.Trim('/')}/keys/{keyId}"), Credentials);

    public KeyClient CreateKeyClient(string keyId)
        => new(new Uri(_options.CurrentValue.Url), Credentials);
}
