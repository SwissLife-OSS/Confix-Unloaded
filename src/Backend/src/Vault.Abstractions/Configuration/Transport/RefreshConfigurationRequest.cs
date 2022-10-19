namespace Vault.Host.Configuration.Transport;

public record RefreshConfigurationRequest(
    string ApplicationName,
    string ApplicationPartName,
    string EnvironmentName,
    string Configuration,
    string RefreshToken);

