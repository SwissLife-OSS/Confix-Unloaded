using System.Security.Cryptography;
using System.Text;

namespace Confix.CryptoProviders.AzureKeyVault;

internal sealed class KeyVaultCryptoProvider : IEncryptor, IDecryptor
{
    private readonly IKeyEncryptionKeyProvider _keyEncryptionKeyProvider;

    public KeyVaultCryptoProvider(IKeyEncryptionKeyProvider keyEncryptionKeyProvider)
    {
        _keyEncryptionKeyProvider = keyEncryptionKeyProvider;
    }

    public async Task<string> DecryptAsync(
        EncryptedValue encryptedValue,
        CancellationToken cancellationToken)
    {
        var key = await _keyEncryptionKeyProvider.GetKeyAsync(encryptedValue.Topic,
            cancellationToken);
        using var aes = Aes.Create();
        aes.Key = key;
        var iv = Convert.FromBase64String(encryptedValue.Iv);
        var cypher = Convert.FromBase64String(encryptedValue.Value);
        var plainText = aes.DecryptCfb(cypher, iv, PaddingMode.PKCS7);

        return Encoding.UTF8.GetString(plainText);
    }

    public async Task<EncryptedValue> EncryptAsync(
        string topic,
        string value,
        CancellationToken cancellationToken)
    {
        var key = await _keyEncryptionKeyProvider.GetKeyAsync(topic, cancellationToken);
        using var aes = Aes.Create();
        aes.GenerateIV();
        aes.Key = key;
        var plainText = Encoding.UTF8.GetBytes(value);
        var cypher = aes.EncryptCfb(plainText, aes.IV, PaddingMode.PKCS7);
        var cypherText = Convert.ToBase64String(cypher);
        var iv = Convert.ToBase64String(aes.IV);

        return new EncryptedValue(cypherText, iv, topic);
    }
}
