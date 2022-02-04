namespace Confix.Vault.Core;

public interface IApiKeyProvider
{
    string GetPrefix(string apiKey);

    ApiKey GenerateKey();

    bool ValidateKey(string apiKey, string plainText);
}
