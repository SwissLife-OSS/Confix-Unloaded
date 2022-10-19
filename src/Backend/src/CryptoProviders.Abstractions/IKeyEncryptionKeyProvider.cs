namespace Confix.CryptoProviders;

public interface IKeyEncryptionKeyProvider
{
    ValueTask<byte[]> GetKeyAsync(string topic, CancellationToken cancellationToken);
}
