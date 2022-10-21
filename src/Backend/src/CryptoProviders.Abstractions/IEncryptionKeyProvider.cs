namespace Confix.CryptoProviders;

public interface IEncryptionKeyProvider
{
    ValueTask<byte[]> GetKeyAsync(string topic, CancellationToken cancellationToken);
}
