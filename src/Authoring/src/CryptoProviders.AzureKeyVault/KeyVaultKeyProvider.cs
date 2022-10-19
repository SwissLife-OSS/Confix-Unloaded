using System.Security.Cryptography;
using System.Transactions;
using Azure.Security.KeyVault.Keys;
using Azure.Security.KeyVault.Keys.Cryptography;
using Microsoft.Extensions.Options;
using static System.Transactions.TransactionScopeAsyncFlowOption;
using static System.Transactions.TransactionScopeOption;

namespace Confix.CryptoProviders.AzureKeyVault;

internal sealed class KeyVaultKeyProvider : IKeyProvider
{
    private readonly IKeyCache _keyCache;
    private readonly ISecretRepository _secrets;
    private readonly ICryptographyClientFactory _clientFactory;
    private readonly IOptionsMonitor<AzureKeyVaultOptions> _options;

    public KeyVaultKeyProvider(
        IKeyCache keyCache,
        ICryptographyClientFactory clientFactory,
        ISecretRepository secrets,
        IOptionsMonitor<AzureKeyVaultOptions> options)
    {
        _keyCache = keyCache;
        _secrets = secrets;
        _clientFactory = clientFactory;
        _options = options;
    }

    public ValueTask<byte[]> GetKeyAsync(string topic, CancellationToken cancellationToken)
    {
        async Task<byte[]> CreateKey()
        {
            Secret? secret = await _secrets.GetSecretByTopicAsync(topic, cancellationToken);
            if (secret is null)
            {
                secret = await GetOrCreateSecretAsync(topic, cancellationToken);
            }

            return await DecryptSecretAsync(secret, cancellationToken);
        }

        return _keyCache.GetOrCreateAsync(topic, CreateKey);
    }

    private async Task EnsureKeyAsync(
        string topic,
        CancellationToken cancellationToken)
    {
        KeyClient keyClient = _clientFactory.CreateKeyClient(topic);
        try
        {
            Azure.Response<KeyVaultKey> keyResponse =
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
        Secret secret,
        CancellationToken cancellationToken)
    {
        EncryptionAlgorithm algorithm = new(secret.EncryptionAlgorithm);
        CryptographyClient encryptionClient = _clientFactory.CreateCryptoClient(secret.Topic);

        var decodedKey = Convert.FromBase64String(secret.Key);

        DecryptResult decryptedKey =
            await encryptionClient.DecryptAsync(algorithm, decodedKey, cancellationToken);

        return decryptedKey.Plaintext;
    }

    private async Task<Secret> GetOrCreateSecretAsync(
        string topic,
        CancellationToken cancellationToken)
    {
        using (var scope = new TransactionScope(RequiresNew, Enabled))
        {
            await EnsureKeyAsync(topic, cancellationToken);

            using var aes = Aes.Create();
            aes.GenerateKey();

            EncryptionAlgorithm algorithm = new(_options.CurrentValue.Algorithm);
            CryptographyClient encryptionClient = _clientFactory.CreateCryptoClient(topic);

            EncryptResult encryptedKey =
                await encryptionClient.EncryptAsync(algorithm, aes.Key, cancellationToken);

            var encodedKey = Convert.ToBase64String(encryptedKey.Ciphertext);

            Secret newSecret = new(
                Guid.NewGuid(),
                DateTime.UtcNow,
                topic,
                encodedKey,
                _options.CurrentValue.Algorithm);

            // It could be that another service has already created a secret. This way
            // we ensure that we would receive this secret and throw away our secret
            Secret secret = await _secrets.GetOrCreateByTopicAsync(newSecret, cancellationToken);
            scope.Complete();
            return secret;
        }
    }
}
