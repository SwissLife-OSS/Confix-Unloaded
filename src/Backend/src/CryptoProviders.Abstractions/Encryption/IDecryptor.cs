using System.Threading;
using System.Threading.Tasks;

namespace Confix.CryptoProviders;

public interface IDecryptor
{
    Task<string> DecryptAsync(
        EncryptedValue encryptedValue,
        CancellationToken cancellationToken);
}
