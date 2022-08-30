namespace Confix.Vault.Core;

public interface ITokenProivder
{
    string GetPrefix(string token);

    Token GenerateToken();

    bool ValidateToken(string token, string plainText);
}
