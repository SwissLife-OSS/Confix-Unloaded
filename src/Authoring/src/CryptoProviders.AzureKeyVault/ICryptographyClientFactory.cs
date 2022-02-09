using Azure.Security.KeyVault.Keys;
using Azure.Security.KeyVault.Keys.Cryptography;

namespace Confix.CryptoProviders.AzureKeyVault;

public interface ICryptographyClientFactory
{
    CryptographyClient CreateCryptoClient(string keyId);

    KeyClient CreateKeyClient(string keyId);
}
