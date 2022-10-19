namespace Confix.Authentication;

public class ClientCredentialsClientOptions
{
    public string ClientId { get; set; } = string.Empty;
    public string Secret { get; set; } = string.Empty;
    public string Scopes { get; set; } = string.Empty;
    public string Authority { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
}
