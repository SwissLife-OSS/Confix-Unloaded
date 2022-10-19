using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Confix.Vault.Abstractions;

namespace Confix.Vault.Client;

public interface IVaultClient
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

    Task RefreshAsync(
        string applicationName,
        string applicationPartName,
        string environmentName,
        string configuration,
        string refreshToken,
        CancellationToken cancellationToken);
}
