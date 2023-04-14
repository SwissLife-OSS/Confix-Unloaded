using System.Security.Cryptography;

namespace Confix.CryptoProviders;

public sealed class InMemoryCryptoProvider

{
    public InMemoryCryptoProvider(byte[] key)
    {
        Key = key;
        KeyBase64 = Convert.ToBase64String(key);
    }

    public byte[] Key { get; }

    public string KeyBase64 { get; }

    public string DecryptAsync(string encodedIv, string encodedCypher)
        => CfbEncryption.Decrypt(Key, encodedIv, encodedCypher);

    public CypherAndIv EncryptAsync(string value)
        => CfbEncryption.Encrypt(Key, value);

    public static InMemoryCryptoProvider New()
    {
        using var aes = Aes.Create();

        aes.GenerateKey();

        return new InMemoryCryptoProvider(aes.Key);
    }

    public static InMemoryCryptoProvider From(byte[] key)
    {
        return new InMemoryCryptoProvider(key);
    }

    public static InMemoryCryptoProvider From(string key)
    {
        return new InMemoryCryptoProvider(Convert.FromBase64String(key));
    }
}
