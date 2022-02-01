namespace Confix.Vault.Core;

public interface IEncryptionProvider
{
    byte[] GenerateIV();

    byte[] Decrypt(byte[] plainText, byte[] iv, byte[] key);

    byte[] Encrypt(byte[] cipherText, byte[] iv, byte[] key);
}
