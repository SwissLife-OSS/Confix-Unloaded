namespace Confix.Vault.Core;

public interface IEncryptionProvider
{
    byte[] GenerateIV();

    byte[] Encrypt(byte[] plainText, byte[] iv, byte[] key);

    byte[] Decrypt(byte[] cipherText, byte[] iv, byte[] key);
}
