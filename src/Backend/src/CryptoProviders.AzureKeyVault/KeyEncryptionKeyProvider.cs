using Azure.Security.KeyVault.Keys.Cryptography;

namespace Confix.CryptoProviders.AzureKeyVault;

internal sealed class KeyEncryptionKeyProvider : IKeyEncryptionKeyProvider
{
    private readonly ICryptographyClientFactory _clientFactory;
    private readonly IDataEncryptionKeyRepository _dataEncryptionKeys;
    private readonly IKeyEncryptionKeyCache _keyEncryptionKeyCache;

    public KeyEncryptionKeyProvider(
        IKeyEncryptionKeyCache keyEncryptionKeyCache,
        ICryptographyClientFactory clientFactory,
        IDataEncryptionKeyRepository dataEncryptionKeys)
    {
        _keyEncryptionKeyCache = keyEncryptionKeyCache;
        _dataEncryptionKeys = dataEncryptionKeys;
        _clientFactory = clientFactory;
    }

    public ValueTask<byte[]> GetKeyAsync(string topic, CancellationToken cancellationToken)
    {
        async Task<byte[]> CreateKey()
        {
            var secret = await _dataEncryptionKeys.GetSecretByTopicAsync(topic, cancellationToken);

            return await DecryptSecretAsync(secret, cancellationToken);
        }

        return _keyEncryptionKeyCache.GetOrCreateAsync(topic, CreateKey);
    }

    private async Task<byte[]> DecryptSecretAsync(
        DataEncryptionKey dataEncryptionKey,
        CancellationToken cancellationToken)
    {
        EncryptionAlgorithm algorithm = new(dataEncryptionKey.EncryptionAlgorithm);
        var encryptionClient = _clientFactory.CreateCryptoClient(dataEncryptionKey.Topic);

        var decodedKey = Convert.FromBase64String(dataEncryptionKey.Key);

        var decryptedKey =
            await encryptionClient.DecryptAsync(algorithm, decodedKey, cancellationToken);

        return decryptedKey.Plaintext;
    }
}
