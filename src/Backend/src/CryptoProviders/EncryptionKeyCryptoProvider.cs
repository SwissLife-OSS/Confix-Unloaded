namespace Confix.CryptoProviders.AzureKeyVault;

public sealed class EncryptionKeyCryptoProvider : IEncryptor, IDecryptor
{
    private readonly IEncryptionKeyProvider _encryptionKeyProvider;

    public EncryptionKeyCryptoProvider(IEncryptionKeyProvider encryptionKeyProvider)
    {
        _encryptionKeyProvider = encryptionKeyProvider;
    }

    public async ValueTask<string> DecryptAsync(
        EncryptedValue encryptedValue,
        CancellationToken cancellationToken)
    {
        var key = await _encryptionKeyProvider.GetKeyAsync(encryptedValue.Topic, cancellationToken);

        return CfbEncryption.Decrypt(key, encryptedValue.Iv, encryptedValue.Value);
    }

    public async ValueTask<EncryptedValue> EncryptAsync(
        string topic,
        string value,
        CancellationToken cancellationToken)
    {
        var key = await _encryptionKeyProvider.GetKeyAsync(topic, cancellationToken);

        var encrypted = CfbEncryption.Encrypt(key, value);

        return new EncryptedValue(encrypted.Cypher, encrypted.Iv, topic);
    }
}
