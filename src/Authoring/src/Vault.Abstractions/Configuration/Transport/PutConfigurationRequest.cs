namespace Vault.Host.Configuration.Transport;

public record PutConfigurationRequest(
    string ApplicationName,
    string ApplicationPartName,
    string EnvironmentName,
    string Configuration);
