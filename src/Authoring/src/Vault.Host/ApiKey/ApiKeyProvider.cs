using System.Security.Cryptography;
using Confix.Vault.Core;
using Microsoft.AspNetCore.Identity;
using static Microsoft.AspNetCore.Identity.PasswordVerificationResult;

namespace Confix.Vault.Host;

public class ApiKeyKeyProvider : IApiKeyProvider
{
    private const int ApiKeySize = 60;
    private const int PrefixLength = 10;
    private static readonly IReadOnlyList<char> ValidApiKeyCharacters =
        "ABCDEFGHIJKLMNOPQRSTUFWXYZabcdefghijklmnopqrstufwxyz0123456789".ToCharArray();

    private readonly IPasswordHasher<object> _hasher;

    public ApiKeyKeyProvider(IPasswordHasher<object> hasher)
    {
        _hasher = hasher;
    }

    public ApiKey GenerateKey()
    {
        var key = CreateApiKey();
        var hash = _hasher.HashPassword(default!, key);

        return new ApiKey(key, hash);
    }

    public string GetPrefix(string apiKey)
    {
        if (apiKey.Length < ApiKeySize)
        {
            throw new ArgumentException($"Key must be at least than {ApiKeySize}.", nameof(apiKey));
        }
        return apiKey[0..PrefixLength];
    }

    public bool ValidateKey(string apiKey, string plainText) =>
        _hasher.VerifyHashedPassword(default!, apiKey, plainText) is Success or SuccessRehashNeeded;

    private static string CreateApiKey()
    {
        char[] apiKey = new char[ApiKeySize];
        byte[] generated = RandomNumberGenerator.GetBytes(ApiKeySize);

        for (var i = 0; i < ApiKeySize; i++)
        {
            apiKey[i] = ValidApiKeyCharacters[generated[i] % ValidApiKeyCharacters.Count];
        }

        return new string(apiKey);
    }
}
