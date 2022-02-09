using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Confix.Vault.Client;

public interface IVaultClient
{
    Task<string> CreateAsync(
        string applicationName,
        string applicationPartName,
        string environmentName,
        string configuration,
        CancellationToken cancellationToken);

    Task<JsonDocument?> GetAsync(
        string applicationName,
        string applicationPartName,
        string environmentName,
        string token,
        CancellationToken cancellationToken);
}
