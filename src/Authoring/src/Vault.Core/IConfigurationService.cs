using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Confix.Vault.Core;

public interface IConfigurationService
{
    Task<TokenPair> CreateAsync(
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

    Task RefreshConfigurationAsync(
        string applicationName,
        string applicationPartName,
        string environmentName,
        string configuration,
        string refreshToken,
        CancellationToken cancellationToken);
}
