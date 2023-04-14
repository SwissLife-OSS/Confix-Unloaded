using System.Text.Json;
using Confix.Vault.Abstractions;
using Vault.Host.Configuration.Transport;

namespace Confix.Vault.Client;

public interface IVaultClient
{
    Task<TokenPair> CreateAsync(
        string applicationName,
        string applicationPartName,
        string environmentName,
        string configuration,
        CancellationToken cancellationToken);

    Task<CypherAndIv?> GetAsync(
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
