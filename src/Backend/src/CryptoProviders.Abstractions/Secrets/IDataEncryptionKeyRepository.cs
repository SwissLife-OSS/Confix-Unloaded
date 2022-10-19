namespace Confix.CryptoProviders;

public interface IDataEncryptionKeyRepository
{
    Task<DataEncryptionKey> GetSecretByTopicAsync(
        string topic,
        CancellationToken cancellationToken);

    Task<DataEncryptionKey> GetOrCreateByTopicAsync(
        DataEncryptionKey dataEncryptionKey,
        CancellationToken cancellationToken);
}
