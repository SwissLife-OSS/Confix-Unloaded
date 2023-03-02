namespace Confix.CryptoProviders;

public interface IEncryptor
{
    ValueTask<EncryptedValue> EncryptAsync(
        string topic,
        string value,
        CancellationToken cancellationToken);
}
