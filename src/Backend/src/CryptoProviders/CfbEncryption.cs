using System.Security.Cryptography;
using System.Text;

namespace Confix.CryptoProviders;

internal static class CfbEncryption
{
    public static string Decrypt(
        byte[] key,
        string encodedIv,
        string encodedCypher)
    {
        using var aes = Aes.Create();
        aes.Key = key;
        var iv = Convert.FromBase64String(encodedIv);
        var cypher = Convert.FromBase64String(encodedCypher);
        var plainText = aes.DecryptCfb(cypher, iv, PaddingMode.PKCS7);

        return Encoding.UTF8.GetString(plainText);
    }

    public static CypherAndIv Encrypt(
        byte[] key,
        string value)
    {
        using var aes = Aes.Create();
        aes.GenerateIV();
        aes.Key = key;
        var plainText = Encoding.UTF8.GetBytes(value);
        var cypher = aes.EncryptCfb(plainText, aes.IV, PaddingMode.PKCS7);
        var cypherText = Convert.ToBase64String(cypher);
        var iv = Convert.ToBase64String(aes.IV);

        return new CypherAndIv(cypherText, iv);
    }
}
