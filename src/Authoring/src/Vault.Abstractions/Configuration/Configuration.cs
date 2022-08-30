using System;

namespace Confix.Vault.Abstractions;

public class Configuration
{
    public Configuration(
        Guid id,
        string applicationName,
        string applicationPartName,
        string environmentName,
        string apiKey,
        string keyPrefix,
        byte[] content,
        byte[] iv)
    {
        Id = id;
        ApplicationName = applicationName;
        ApplicationPartName = applicationPartName;
        EnvironmentName = environmentName;
        ApiKey = apiKey;
        Content = content;
        KeyPrefix = keyPrefix;
        Iv = iv;
    }

    public Guid Id { get; init; }

    public string ApplicationName { get; init; }

    public string ApplicationPartName { get; init; }

    public string EnvironmentName { get; init; }

    public string ApiKey { get; init; }

    public string KeyPrefix { get; init; }

    public byte[] Content { get; init; }

    public byte[] Iv { get; init; }
}
