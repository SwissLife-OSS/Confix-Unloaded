using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.DependencyInjection;
using static System.Environment;

namespace ConfiX;

internal sealed class VariableProvider
{
    private const string _vaultUrl = "SWISSLIFE_CONFIX_VAULT";
    private const string _environment = "SWISSLIFE_ENVIRONMENT";
    private const string _token = "SWISSLIFE_CONFIX_TOKEN";

    public string ResolveVaultUrl() => GetEnvironmentVariable(_vaultUrl)
        ?? throw EnvironmentVariableNotFound(_vaultUrl);

    public string ResolverEnvironment() => GetEnvironmentVariable(_environment)
        ?? throw EnvironmentVariableNotFound(_environment);

    public string ResolveToken(ApplicationPart part)
    {
        var token = GetEnvironmentVariable(_token);
        if (token is { })
        {
            return token;
        }

        var filepath = GetTokenFromFile(part.Name, part.PartName, ResolverEnvironment());
        if (File.Exists(filepath))
        {
            var protector = new ServiceCollection().AddDataProtection()
                .SetApplicationName("Confix_Token")
                .Services
                .BuildServiceProvider()
                .GetRequiredService<IDataProtectionProvider>()
                .CreateProtector("Confix_Token");

            return protector.Unprotect(filepath);
        }

        throw EnvironmentVariableNotFound(_token);
    }

    private static string GetTokenFromFile(string name, string partName, string environmentName)
        => Path.Combine(Directory.GetCurrentDirectory(),
            $"{name}_{partName}_{environmentName}_confix.vaultconfig.json");

    private static Exception EnvironmentVariableNotFound(string variable)
        => throw new Exception($"Environment variable {variable} was not found");
}
