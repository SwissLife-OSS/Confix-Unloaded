using static System.Environment;

namespace Confix.Value.Configuration;

internal class VariableProvider
{
    private const string _vaultUrl = "CONFIX_VAULT";
    private const string _authoringUrl = "CONFIX_AUTHORING";
    private const string _environment = "CONFIX_ENVIRONMENT";
    private const string _decryptionKey = "CONFIX_DECRYPTION_KEY";
    private const string _token = "CONFIX_TOKEN";

    public string ResolveVaultUrl() => GetEnvironmentVariable(_vaultUrl)
        ?? throw EnvironmentVariableNotFound(_vaultUrl);

    public string ResolverEnvironment() => GetEnvironmentVariable(_environment)
        ?? throw EnvironmentVariableNotFound(_environment);

    public string ResolveDecryptionKey() => GetEnvironmentVariable(_decryptionKey)
        ?? throw EnvironmentVariableNotFound(_decryptionKey);

    public string? ResolveVaultToken()
    {
        return GetEnvironmentVariable(_token);
    }

    public string? ResolveAuthoringUrl() => GetEnvironmentVariable(_authoringUrl);

    private Exception EnvironmentVariableNotFound(string variable)
        => throw new Exception($"Environment variable {variable} was not found");
}
