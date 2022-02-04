using System.Text.Json;

namespace Vault.Host.Configuration.Transport;

public record GetConfigurationResponse(JsonDocument? Configuration, string? Error)
{
    public static GetConfigurationResponse FromError(string error) => new(null, error);

    public static GetConfigurationResponse FromSuccess(JsonDocument content) => new(content, null);
}
