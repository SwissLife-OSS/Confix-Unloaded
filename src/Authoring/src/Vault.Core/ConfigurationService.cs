using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Unicode;
using System.Threading;
using System.Threading.Tasks;
using Confix.Vault.Abstractions;
using Confix.Vault.Store;

namespace Confix.Vault.Core;

public class ConfigurationService : IConfigurationService
{
    private const int ApiKeySize = 50;
    private readonly IReadOnlyList<char> ValidApiKeyCharacters =
        "ABCDEFGHIJKLMNOPQRSTUFWXYZabcdefghijklmnopqrstufwxyz0123456789".ToCharArray();
    private readonly IEncryptionProvider _encryptionProvider;
    private readonly IKeyProvider _keyProvider;
    private readonly IConfigurationStore _store;

    public ConfigurationService(IEncryptionProvider encryptionProvider, IConfigurationStore store, IKeyProvider keyProvider)
    {
        _encryptionProvider = encryptionProvider;
        _store = store;
        _keyProvider = keyProvider;
    }

    public async Task<string> CreateAsync(
        string applicationName,
        string applicationPartName,
        string environmentName,
        string configuration,
        CancellationToken cancellationToken)
    {
        byte[] key = _keyProvider.GetKey();
        byte[] iv = _encryptionProvider.GenerateIV();
        string apiKey = CreateApiKey();

        byte[] cipherText =
            _encryptionProvider.Encrypt(Encoding.UTF8.GetBytes(configuration), iv, key);

        Configuration config = new Configuration(
            Guid.NewGuid(),
            applicationName,
            applicationPartName,
            environmentName,
            apiKey,
            cipherText,
            iv);

        await _store.StoreAsync(config, cancellationToken);

        return apiKey;
    }

    public async Task<JsonDocument?> GetAsync(
        string applicationName,
        string applicationPartName,
        string environmentName,
        string apiKey,
        CancellationToken cancellationToken)
    {
        Configuration? configuration = await _store.GetAsync(
            applicationName,
            applicationPartName,
            environmentName,
            apiKey,
            cancellationToken);

        if (configuration is null)
        {
            return null;
        }

        byte[] key = _keyProvider.GetKey();
        byte[] plaintext = _encryptionProvider
            .Decrypt(configuration.Content, configuration.Iv, key);

        return Deserialize(plaintext);
    }

    private static JsonDocument? Deserialize(byte[] content)
    {
        Utf8JsonReader reader = new(content);
        return JsonDocument.ParseValue(ref reader);
    }

    private static string CreateApiKey()
    {
        char[] apiKey = new char[ApiKeySize];
        byte[] generated = RandomNumberGenerator.GetBytes(ApiKeySize);

        for (var i = 0; i < ApiKeySize; i++)
        {
            apiKey[i] = ValidApiKeyCharacters[generated[i] % ValidApiKeyCharacters.Count];
        }

        return new string(apiKey);
    }
}
