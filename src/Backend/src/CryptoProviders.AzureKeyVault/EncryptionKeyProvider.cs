using System.Security.Cryptography;
using System.Transactions;
using Azure.Security.KeyVault.Keys;
using Azure.Security.KeyVault.Keys.Cryptography;
using Microsoft.Extensions.Options;

namespace Confix.CryptoProviders.AzureKeyVault;

internal sealed class EncryptionKeyProvider : IEncryptionKeyProvider
{
    private readonly ICryptographyClientFactory _clientFactory;
    private readonly IDataEncryptionKeyRepository _dataEncryptionKeys;
    private readonly IOptionsMonitor<AzureKeyVaultOptions> _options;
    private readonly IKeyEncryptionKeyCache _keyEncryptionKeyCache;

    public EncryptionKeyProvider(
        IKeyEncryptionKeyCache keyEncryptionKeyCache,
        ICryptographyClientFactory clientFactory,
        IDataEncryptionKeyRepository dataEncryptionKeys,
        IOptionsMonitor<AzureKeyVaultOptions> options)
    {
        _keyEncryptionKeyCache = keyEncryptionKeyCache;
        _dataEncryptionKeys = dataEncryptionKeys;
        _options = options;
        _clientFactory = clientFactory;
    }

    public ValueTask<byte[]> GetKeyAsync(string topic, CancellationToken cancellationToken)
    {
        return _keyEncryptionKeyCache.GetOrCreateAsync(topic, CreateKey);

        async Task<byte[]> CreateKey()
        {
            var secret =
                await _dataEncryptionKeys.GetSecretByTopicAsync(topic, cancellationToken);

            if (secret is null)
            {
                secret = await GetOrCreateSecretAsync(topic, cancellationToken);
            }

            return await DecryptSecretAsync(secret, cancellationToken);
        }
    }

    private async Task EnsureKeyAsync(
        string topic,
        CancellationToken cancellationToken)
    {
        var keyClient = _clientFactory.CreateKeyClient(topic);

        try
        {
            await keyClient.GetKeyAsync(topic, cancellationToken: cancellationToken);
        }
        catch (Azure.RequestFailedException ex)
        {
            if (ex.Message
                .Contains($"A key with (name/id) {topic} was not found in this key vault."))
            {
                await keyClient.CreateKeyAsync(
                    topic,
                    KeyType.Rsa,
                    new() { KeyOperations = { KeyOperation.Encrypt, KeyOperation.Decrypt } },
                    cancellationToken);
            }
            else
            {
                throw;
            }
        }
    }

    private async Task<byte[]> DecryptSecretAsync(
        DataEncryptionKey secret,
        CancellationToken cancellationToken)
    {
        EncryptionAlgorithm algorithm = new(secret.EncryptionAlgorithm);
        var encryptionClient = _clientFactory.CreateCryptoClient(secret.Topic);

        var decodedKey = Convert.FromBase64String(secret.Key);

        var decryptedKey =
            await encryptionClient.DecryptAsync(algorithm, decodedKey, cancellationToken);

        return decryptedKey.Plaintext;
    }

    private async Task<DataEncryptionKey> GetOrCreateSecretAsync(
        string topic,
        CancellationToken cancellationToken)
    {
        using (var scope = new TransactionScope(
                   TransactionScopeOption.RequiresNew,
                   TransactionScopeAsyncFlowOption.Enabled))
        {
            await EnsureKeyAsync(topic, cancellationToken);

            using var aes = Aes.Create();
            aes.GenerateKey();

            EncryptionAlgorithm algorithm = new(_options.CurrentValue.Algorithm);
            var encryptionClient = _clientFactory.CreateCryptoClient(topic);

            var encryptedKey =
                await encryptionClient.EncryptAsync(algorithm, aes.Key, cancellationToken);

            var encodedKey = Convert.ToBase64String(encryptedKey.Ciphertext);

            var newSecret = new DataEncryptionKey(
                Guid.NewGuid(),
                DateTime.UtcNow,
                topic,
                encodedKey,
                _options.CurrentValue.Algorithm);

            // It could be that another service has already created a secret. This way
            // we ensure that we would receive this secret and throw away our secret
            var secret =
                await _dataEncryptionKeys.GetOrCreateByTopicAsync(newSecret, cancellationToken);
            scope.Complete();
            return secret;
        }
    }
}
