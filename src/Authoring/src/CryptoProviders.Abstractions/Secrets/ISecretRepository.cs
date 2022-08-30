using System.Threading;
using System.Threading.Tasks;

namespace Confix.CryptoProviders;

public interface ISecretRepository
{
    Task<Secret> GetSecretByTopicAsync(string topic, CancellationToken cancellationToken);

    Task<Secret> GetOrCreateByTopicAsync(Secret secret, CancellationToken cancellationToken);
}
