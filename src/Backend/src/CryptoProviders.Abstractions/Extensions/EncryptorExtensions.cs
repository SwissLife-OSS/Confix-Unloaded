namespace Confix.CryptoProviders;

public static class EncryptorExtensions
{
    public static async Task<EncryptedValue> EncryptAsync(
        this IEncryptor encryptor,
        string topic,
        string value,
        Guid environmentId,
        CancellationToken cancellationToken)
    {
        return await encryptor.EncryptAsync($"{topic}-{environmentId:N}", value, cancellationToken);
    }
}
