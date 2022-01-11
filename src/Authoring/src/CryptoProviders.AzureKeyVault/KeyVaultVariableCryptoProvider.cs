using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Azure.Security.KeyVault.Keys.Cryptography;
using Confix.Authoring;

namespace Confix.CryptoProvider.AzureKeyVault;

public class KeyVaultVariableCryptoProvider : IVariableCryptoProvider
{
    private readonly ICryptographyClientFactory _clientFactory;
    private readonly AzureKeyVaultOptions _options;
    private const string KeyProviderName = "AZURE_KEYVAULT";

    public KeyVaultVariableCryptoProvider(
        ICryptographyClientFactory clientFactory,
        AzureKeyVaultOptions options)
    {
        _clientFactory = clientFactory;
        _options = options;
    }

    public async Task<string> DecryptAsync(
        string cipherValue,
        VariableEncryptionInfo encryptionInfo,
        CancellationToken cancellationToken)
    {
        EncryptionAlgorithm algorithm = new EncryptionAlgorithm(encryptionInfo.Algorithm);

        CryptographyClient cryptoClient = _clientFactory
            .CreateDecryptionClient(encryptionInfo.Key);

        DecryptResult result = await cryptoClient.DecryptAsync(
            algorithm,
            Convert.FromBase64String(cipherValue),
            cancellationToken);

        return Encoding.UTF8.GetString(result.Plaintext);
    }

    public async Task<ValueEncryptionResult> EncryptAsync(
        string value,
        CancellationToken cancellationToken)
    {
        CryptographyClient cryptoClient = _clientFactory.CreateEncryptionClient();

        EncryptResult encryptedValue = await cryptoClient.EncryptAsync(
            new EncryptionAlgorithm(_options.Algorithm),
            Encoding.UTF8.GetBytes(value),
            cancellationToken);

        return new ValueEncryptionResult(
            new VariableEncryptionInfo(
                KeyProviderName,
                _options.EncryptionKeyId,
                encryptedValue.Algorithm.ToString()),
            Convert.ToBase64String(encryptedValue.Ciphertext));
    }
}
