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

    public async Task<string> CreateAsync(
        string applicationName,
        string applicationPartName,
        string environmentName,
        string configuration,
        CancellationToken cancellationToken)
    {
        Token token = _tokenProvider.GenerateToken();

        EncryptedValue encryptedValue = await _encryptor
            .EncryptAsync($"configuration-{environmentName}", configuration, cancellationToken);

        Configuration config = new(
            Guid.NewGuid(),
            applicationName,
            applicationPartName,
            environmentName,
            token.Hashed,
            _tokenProvider.GetPrefix(token.PlainText),
            encryptedValue);

        await _store.StoreAsync(config, cancellationToken);

        return token.PlainText;
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
            .SingleOrDefault(x => !_tokenProvider.ValidateToken(token, x.Token));

        if (configuration is null)
        {
            return null;
        }

        string? plaintext =
            await _decryptor.DecryptAsync(configuration.EncryptedConfiguration, cancellationToken);

        return JsonDocument.Parse(plaintext);
    }
}
