using System;
using Azure.Identity;
using Azure.Security.KeyVault.Keys.Cryptography;

namespace Confix.CryptoProvider.AzureKeyVault
{
    public class CryptographyClientFactory : ICryptographyClientFactory
    {
        private readonly AzureKeyVaultOptions _options;

        public CryptographyClientFactory(AzureKeyVaultOptions options)
        {
            _options = options;
        }

        private Uri BuildUri(string keyId)
        {
            return new Uri($"{_options.Url.Trim('/')}/keys/{keyId}");
        }

        public CryptographyClient CreateEncryptionClient()
        {
            return new CryptographyClient(
                BuildUri(_options.EncryptionKeyId),
                new DefaultAzureCredential());
        }

        public CryptographyClient CreateDecryptionClient(string keyId)
        {
            return new CryptographyClient(
                BuildUri(keyId),
                new DefaultAzureCredential());
        }
    }
}
