using System.Security.Cryptography;

namespace Confix.Vault.Core;

public class EncryptionProvider : IEncryptionProvider
{
    public byte[] GenerateIV()
    {
        using var aes = Aes.Create();
        aes.GenerateIV();
        return aes.IV;
    }

    public byte[] Encrypt(byte[] plainText, byte[] iv, byte[] key)
    {
        using var aes = Aes.Create();
        aes.Key = key;
        return aes.EncryptCfb(plainText, iv, PaddingMode.PKCS7);
    }

    public byte[] Decrypt(byte[] cipherText, byte[] iv, byte[] key)
    {
        using var aes = Aes.Create();
        aes.Key = key;
        return aes.DecryptCfb(cipherText, iv, PaddingMode.PKCS7);
    }
}
