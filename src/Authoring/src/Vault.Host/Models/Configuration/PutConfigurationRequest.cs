namespace Vault.Host.Models;

public record PutConfigurationRequest(
    Guid Id,
    string ApplicationName,
    string ApplicationPartName,
    string EnvironmentName,
    string Configuration);
