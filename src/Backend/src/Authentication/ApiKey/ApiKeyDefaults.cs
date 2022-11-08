namespace Confix.Authentication.ApiKey;

public static class ApiKeyDefaults
{
    /// <summary>
    /// Default value for AuthenticationScheme
    /// </summary>
    public const string AuthenticationScheme = "ApiKey";

    public const string HeaderName = "confix-api-key";

    public const string ApiKeyIdSerializationType = "N";

    public const string ApiKeyClaim = "api-key-id";
}
