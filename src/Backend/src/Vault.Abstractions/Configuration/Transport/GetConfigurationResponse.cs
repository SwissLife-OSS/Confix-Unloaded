using System.Text.Json;

namespace Vault.Host.Configuration.Transport;

public record GetConfigurationResponse(CypherAndIv? Configuration, string? Error)
{
    public static GetConfigurationResponse FromError(string error)
    {
        return new GetConfigurationResponse(null, error);
    }

    public static GetConfigurationResponse FromSuccess(CypherAndIv content)
    {
        return new GetConfigurationResponse(content, null);
    }
}
