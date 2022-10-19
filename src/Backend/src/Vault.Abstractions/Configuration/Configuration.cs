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
        string accessToken,
        string accessTokenPrefix,
        string refreshToken,
        string refreshTokenPrefix,
        EncryptedValue encryptedConfiguration)
    {
        Id = id;
        ApplicationName = applicationName;
        ApplicationPartName = applicationPartName;
        EnvironmentName = environmentName;
        AccessToken = accessToken;
        AccessTokenPrefix = accessTokenPrefix;
        RefreshToken = refreshToken;
        RefreshTokenPrefix = refreshTokenPrefix;
        EncryptedConfiguration = encryptedConfiguration;
    }

    public Guid Id { get; init; }

    public string ApplicationName { get; init; }

    public string ApplicationPartName { get; init; }

    public string EnvironmentName { get; init; }

    public string AccessToken { get; init; }

    public string AccessTokenPrefix { get; init; }

    public string RefreshToken { get; init; }

    public string RefreshTokenPrefix { get; init; }

    public EncryptedValue EncryptedConfiguration { get; init; }
}

public record TokenPair(string AccessToken, string RefreshToken);
