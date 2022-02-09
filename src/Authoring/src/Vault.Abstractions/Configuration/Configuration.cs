using System;
using Confix.CryptoProviders;

namespace Confix.Vault.Abstractions;

public class Configuration
{
    public Configuration(
        Guid id,
        string applicationName,
        string applicationPartName,
        string environmentName,
        string token,
        string keyPrefix,
        EncryptedValue encryptedConfiguration)
    {
        Id = id;
        ApplicationName = applicationName;
        ApplicationPartName = applicationPartName;
        EnvironmentName = environmentName;
        Token = token;
        KeyPrefix = keyPrefix;
        EncryptedConfiguration = encryptedConfiguration;
    }

    public Guid Id { get; init; }

    public string ApplicationName { get; init; }

    public string ApplicationPartName { get; init; }

    public string EnvironmentName { get; init; }

    public string Token { get; init; }

    public string KeyPrefix { get; init; }

    public EncryptedValue EncryptedConfiguration { get; init; }
}
