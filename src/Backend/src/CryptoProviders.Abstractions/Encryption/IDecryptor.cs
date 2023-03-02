namespace Confix.CryptoProviders;

public interface IDecryptor
{
    ValueTask<string> DecryptAsync(
        EncryptedValue encryptedValue,
        CancellationToken cancellationToken);
}
