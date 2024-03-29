using System.Text.Json;

namespace Confix.Vault.Abstractions;

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
