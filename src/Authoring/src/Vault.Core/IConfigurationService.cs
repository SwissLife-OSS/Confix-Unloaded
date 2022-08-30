using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Confix.Vault.Core;

public interface IConfigurationService
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
        string apiKey,
        CancellationToken cancellationToken);
}
