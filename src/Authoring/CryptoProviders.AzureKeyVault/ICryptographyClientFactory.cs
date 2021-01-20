using Azure.Security.KeyVault.Keys.Cryptography;

namespace Confix.CryptoProvider.AzureKeyVault
{
    public interface ICryptographyClientFactory
    {
        CryptographyClient CreateDecryptionClient(string keyId);
        CryptographyClient CreateEncryptionClient();
    }
}