using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Confix.Vault.Abstractions;
using Confix.Vault.Store;

namespace Confix.Vault.Core;

public class ConfigurationService : IConfigurationService
{
    private readonly IEncryptionProvider _encryptionProvider;
    private readonly IKeyProvider _keyProvider;
    private readonly IApiKeyProvider _apiKeyProvider;
    private readonly IConfigurationStore _store;

    public ConfigurationService(
        IEncryptionProvider encryptionProvider,
        IConfigurationStore store,
        IApiKeyProvider apiKeyProvider,
        IKeyProvider keyProvider)
    {
        _encryptionProvider = encryptionProvider;
        _store = store;
        _keyProvider = keyProvider;
        _apiKeyProvider = apiKeyProvider;
    }

    public async Task<string> CreateAsync(
        string applicationName,
        string applicationPartName,
        string environmentName,
        string configuration,
        CancellationToken cancellationToken)
    {
        var key = await _keyProvider.GetKey();
        var iv = _encryptionProvider.GenerateIV();
        ApiKey apiKey = _apiKeyProvider.GenerateKey();

        var cipherText =
            _encryptionProvider.Encrypt(Encoding.UTF8.GetBytes(configuration), iv, key);

        Configuration config = new(
            Guid.NewGuid(),
            applicationName,
            applicationPartName,
            environmentName,
            apiKey.Hashed,
            _apiKeyProvider.GetPrefix(apiKey.PlainText),
            cipherText,
            iv);

        await _store.StoreAsync(config, cancellationToken);

        return apiKey.PlainText;
    }

    public async Task<JsonDocument?> GetAsync(
        string applicationName,
        string applicationPartName,
        string environmentName,
        string apiKey,
        CancellationToken cancellationToken)
    {
        IReadOnlyList<Configuration> configurations = await _store.GetPossibleConfigurationsAsync(
            applicationName,
            applicationPartName,
            environmentName,
            _apiKeyProvider.GetPrefix(apiKey),
            cancellationToken);

        Configuration? configuration = configurations
            .SingleOrDefault(x => !_apiKeyProvider.ValidateKey(apiKey, x.ApiKey));

        if (configuration is null)
        {
            return null;
        }

        var key = await _keyProvider.GetKey();
        var plaintext = _encryptionProvider
            .Decrypt(configuration.Content, configuration.Iv, key);

        return Deserialize(plaintext);
    }

    private static JsonDocument? Deserialize(byte[] content)
    {
        Utf8JsonReader reader = new(content);
        return JsonDocument.ParseValue(ref reader);
    }
}
