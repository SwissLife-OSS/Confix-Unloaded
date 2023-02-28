namespace Confix.Messaging;

public record CreateVaultConfigResponse(
    string ApplicationName,
    string ApplicationPartName,
    string EnvironmentName,
    string AccessToken,
    string RefreshToken);
