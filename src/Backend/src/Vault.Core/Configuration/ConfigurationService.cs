using System.Text.Json;
using Confix.CryptoProviders;
using Confix.Vault.Abstractions;
using Confix.Vault.Store;

namespace Confix.Vault.Core;

internal sealed class ConfigurationService : IConfigurationService
{
    private readonly IDecryptor _decryptor;
    private readonly IEncryptor _encryptor;
    private readonly IConfigurationStore _store;
    private readonly ITokenProvider _tokenProvider;

    public ConfigurationService(
        IEncryptor encryptor,
        IDecryptor decryptor,
        IConfigurationStore store,
        ITokenProvider tokenProvider)
    {
        _store = store;
        _tokenProvider = tokenProvider;
        _encryptor = encryptor;
        _decryptor = decryptor;
    }

    public async Task<TokenPair> CreateAsync(
        string applicationName,
        string applicationPartName,
        string environmentName,
        string configuration,
        CancellationToken cancellationToken)
    {
        var accessToken = _tokenProvider.GenerateToken();
        var refreshToken = _tokenProvider.GenerateToken();

        var encryptedValue = await _encryptor
            .EncryptAsync($"configuration-{environmentName}", configuration, cancellationToken);

        Configuration config = new(
            Guid.NewGuid(),
            applicationName,
            applicationPartName,
            environmentName,
            accessToken.Hashed,
            _tokenProvider.GetPrefix(accessToken.PlainText),
            refreshToken.Hashed,
            _tokenProvider.GetPrefix(accessToken.PlainText),
            encryptedValue);

        await _store.StoreAsync(config, cancellationToken);

        return new TokenPair(accessToken.PlainText, refreshToken.PlainText);
    }

    public async Task RefreshConfigurationAsync(
        string applicationName,
        string applicationPartName,
        string environmentName,
        string configuration,
        string refreshToken,
        CancellationToken cancellationToken)
    {
        var encryptedValue = await _encryptor
            .EncryptAsync($"configuration-{environmentName}", configuration, cancellationToken);

        var configurations = await _store.GetByRefreshTokenAsync(
            applicationName,
            applicationPartName,
            environmentName,
            _tokenProvider.GetPrefix(refreshToken),
            cancellationToken);

        var config = configurations
            .SingleOrDefault(x => !_tokenProvider.ValidateToken(refreshToken, x.RefreshToken));

        if (config is null)
        {
            throw new ConfigurationNotFoundException();
        }

        await _store.UpdateConfigurationAsync(config.Id, encryptedValue, cancellationToken);
    }

    public async Task<JsonDocument?> GetAsync(
        string applicationName,
        string applicationPartName,
        string environmentName,
        string token,
        CancellationToken cancellationToken)
    {
        var configurations = await _store.GetPossibleConfigurationsAsync(
            applicationName,
            applicationPartName,
            environmentName,
            _tokenProvider.GetPrefix(token),
            cancellationToken);

        var configuration =
            configurations.SingleOrDefault(x
                => !_tokenProvider.ValidateToken(token, x.AccessToken));

        if (configuration is null)
        {
            return null;
        }

        var plaintext =
            await _decryptor.DecryptAsync(configuration.EncryptedConfiguration, cancellationToken);

        return JsonDocument.Parse(plaintext);
    }
}
