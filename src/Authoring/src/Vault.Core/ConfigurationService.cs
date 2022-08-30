using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Confix.CryptoProviders;
using Confix.Vault.Abstractions;
using Confix.Vault.Store;

namespace Confix.Vault.Core;

public class ConfigurationService : IConfigurationService
{
    private readonly ITokenProivder _tokenProvider;
    private readonly IEncryptor _encryptor;
    private readonly IDecryptor _decryptor;
    private readonly IConfigurationStore _store;

    public ConfigurationService(
        IEncryptor encryptor,
        IDecryptor decryptor,
        IConfigurationStore store,
        ITokenProivder tokenProvider)
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
        Token accessToken = _tokenProvider.GenerateToken();
        Token refreshToken = _tokenProvider.GenerateToken();

        EncryptedValue encryptedValue = await _encryptor
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

        return new(accessToken.PlainText, refreshToken.PlainText);
    }

    public async Task RefreshConfigurationAsync(
        string applicationName,
        string applicationPartName,
        string environmentName,
        string configuration,
        string refreshToken,
        CancellationToken cancellationToken)
    {
        EncryptedValue encryptedValue = await _encryptor
            .EncryptAsync($"configuration-{environmentName}", configuration, cancellationToken);

        IReadOnlyList<Configuration> configurations = await _store.GetByRefreshTokenAsync(
            applicationName,
            applicationPartName,
            environmentName,
            _tokenProvider.GetPrefix(refreshToken),
            cancellationToken);

        Configuration? config = configurations
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
        IReadOnlyList<Configuration> configurations = await _store.GetPossibleConfigurationsAsync(
            applicationName,
            applicationPartName,
            environmentName,
            _tokenProvider.GetPrefix(token),
            cancellationToken);

        Configuration? configuration = configurations
            .SingleOrDefault(x => !_tokenProvider.ValidateToken(token, x.AccessToken));

        if (configuration is null)
        {
            return null;
        }

        string? plaintext =
            await _decryptor.DecryptAsync(configuration.EncryptedConfiguration, cancellationToken);

        return JsonDocument.Parse(plaintext);
    }
}
