namespace Confix.Vault.Core;

public interface ITokenProvider
{
    string GetPrefix(string token);

    Token GenerateToken();

    bool ValidateToken(string token, string plainText);
}
