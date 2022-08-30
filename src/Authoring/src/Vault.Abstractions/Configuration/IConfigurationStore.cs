using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Confix.Vault.Abstractions;

namespace Confix.Vault.Store;

public interface IConfigurationStore
{
    Task<Configuration> StoreAsync(
        Configuration configuration,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<Configuration>> GetPossibleConfigurationsAsync(
        string applicationName,
        string applicationPartName,
        string environmentName,
        string keyPrefix,
        CancellationToken cancellationToken);
}
