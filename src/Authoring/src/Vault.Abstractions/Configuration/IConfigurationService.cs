using System.Threading;
using System.Threading.Tasks;
using Confix.Vault.Abstractions;

namespace Confix.Vault.Store;

public interface IConfigurationStore
{
    Task<Configuration> StoreAsync(
        Configuration configuration,
        CancellationToken cancellationToken);

    Task<Configuration?> GetAsync(
        string applicationName,
        string applicationPartName,
        string environmentName,
        string apiKey,
        CancellationToken cancellationToken);
}
