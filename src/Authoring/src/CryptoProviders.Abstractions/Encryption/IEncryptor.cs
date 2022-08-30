using System.Threading;
using System.Threading.Tasks;

namespace Confix.CryptoProviders;

public interface IEncryptor
{
    Task<EncryptedValue> EncryptAsync(
        string topic,
        string value,
        CancellationToken cancellationToken);
}
