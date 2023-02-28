namespace Confix.Messaging;

public record CreateVaultConfigRequest(
    string ApplicationName,
    string ApplicationPartName,
    string EnvironmentName,
    string Configuration);
