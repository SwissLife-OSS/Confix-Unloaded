namespace Confix.CryptoProviders;

public interface IKeyProvider
{
    ValueTask<byte[]> GetKeyAsync(string topic, CancellationToken cancellationToken);
}
