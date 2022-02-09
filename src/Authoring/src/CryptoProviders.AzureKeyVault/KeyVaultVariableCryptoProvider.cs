using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Confix.CryptoProviders.AzureKeyVault;

public class KeyVaultCryptoProvider
    : IEncryptor
    , IDecryptor
{
    private readonly IKeyProvider _keyProvider;

    public KeyVaultCryptoProvider(IKeyProvider keyProvider)
    {
        _keyProvider = keyProvider;
    }

    public async Task<string> DecryptAsync(
        EncryptedValue encryptedValue,
        CancellationToken cancellationToken)
    {
        var key = await _keyProvider.GetKeyAsync(encryptedValue.Topic, cancellationToken);
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
        var key = await _keyProvider.GetKeyAsync(topic, cancellationToken);
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
