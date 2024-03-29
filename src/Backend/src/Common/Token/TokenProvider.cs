using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity;
using static Microsoft.AspNetCore.Identity.PasswordVerificationResult;

namespace Confix.Common.Token;

internal sealed class TokenProvider : ITokenProvider
{
    private const int _tokenLength = 120;
    private const int PrefixLength = 10;
    private static readonly IReadOnlyList<char> _validTokenCharacters =
        "ABCDEFGHIJKLMNOPQRSTUFWXYZabcdefghijklmnopqrstufwxyz0123456789".ToCharArray();

    private readonly IPasswordHasher<object> _hasher;

    public TokenProvider(IPasswordHasher<object> hasher)
    {
        _hasher = hasher;
    }

    public Token GenerateToken()
    {
        var key = CreateToken();
        var hash = _hasher.HashPassword(default!, key);

        return new Token(key, hash);
    }

    public string GetPrefix(string token)
    {
        if (token.Length < _tokenLength)
        {
            throw new ArgumentException($"Key must be at least than {_tokenLength}.",
                nameof(token));
        }

        return token[..PrefixLength];
    }

    public bool ValidateToken(string token, string plainText)
    {
        return _hasher
            .VerifyHashedPassword(default!, token, plainText) is Success or SuccessRehashNeeded;
    }

    private static string CreateToken()
    {
        var token = new char[_tokenLength];
        var generated = RandomNumberGenerator.GetBytes(_tokenLength);

        for (var i = 0; i < _tokenLength; i++)
        {
            token[i] = _validTokenCharacters[generated[i] % _validTokenCharacters.Count];
        }

        return new string(token);
    }
}
