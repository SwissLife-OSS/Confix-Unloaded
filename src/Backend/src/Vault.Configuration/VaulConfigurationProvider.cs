using System.Text.Json;
using Azure.Core;
using Azure.Identity;
using Confix.CryptoProviders;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Value.Configuration;

public class VaultConfigurationProvider : ConfigurationProvider
{
    private readonly VaultConfigurationSource _source;
    private readonly VariableProvider _provider;

    public VaultConfigurationProvider(VaultConfigurationSource source)
    {
        _source = source;
        _provider = new VariableProvider();
    }

    public override void Load()
    {
        var environment = _provider.ResolverEnvironment();
        var (applicationName, partName) = _source.Part;

        IDictionary<string, string?>? data = null;

        // We try to load the configuration from the vault first. If we don't have a vault token
        // we assume that we are running in a local environment and try to load the configuration
        // from the authoring directly.
        data = TryLoadConfigurationFromVault(applicationName, partName, environment);

        // If we don't have a vault token we try to load the configuration from the authoring.
        // This is only possible if we have a valid authoring url and the user is logged in
        // with az login.
        data ??= LoadConfigurationFromAuthoring(applicationName, partName, environment);

        var filepath = GetTokenFromFile(_source.Part.Name, _source.Part.PartName, environment);
        var protector = CreateProtector();

        // If we were able to load the configuration we save it to the local file system as a cache.
        if (data is not null)
        {
            UpdateLocalConfiguration(filepath, protector, data);
        }

        // If we still don't have a configuration we try to load it from the cache in the
        // local file system.
        data ??= LoadLocalConfiguration(filepath, protector);

        Data = data ?? throw new Exception("Could not load configruation");
    }

    private static IDictionary<string, string?>? LoadLocalConfiguration(
        string filepath,
        IDataProtector protector)
    {
        // If the file does not exist we return null to indicate that we could not load the
        // configuration from the local file system.
        if (File.Exists(filepath))
        {
            return null;
        }

        Console.WriteLine($"Loading configuration from file {filepath}");

        try
        {
            var configuration = File.ReadAllBytes(filepath);
            var result = JsonDocument.Parse(protector.Unprotect(configuration));
            return JsonConfigurationFileParser.ParseJson(result);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Could not load configuration from file: " + ex.Message);

            return null;
        }
    }

    private static void UpdateLocalConfiguration(
        string filepath,
        IDataProtector protector,
        IDictionary<string, string?> data)
    {
        if (File.Exists(filepath))
        {
            File.Delete(filepath);
        }

        File.WriteAllText(filepath, protector.Protect(JsonSerializer.Serialize(data)));
    }

    private IDictionary<string, string?>? LoadConfigurationFromAuthoring(
        string applicationName,
        string partName,
        string environment)
    {
        // to load the configuration from the authoring we need a valid authoring url
        if (_provider.ResolveAuthoringUrl() is not { } authoringUrl)
        {
            return null;
        }

        // to load the configuration we also need a valid token from az login otherwise we
        // can't load the configuration.
        if (GetAzureCliToken() is not { } token)
        {
            return null;
        }

        Console.WriteLine($"Loading configuration with az login from {authoringUrl}");

        try
        {
            authoringUrl = authoringUrl.EnsureSlashGraphQL();

            var client = AuthoringClientFactory.CreateClient(authoringUrl, token);

            var configuration =
                client.FetchLatestPublishedVersion(applicationName, partName, environment);

            if (configuration is null)
            {
                return null;
            }

            return JsonConfigurationFileParser.ParseJson(JsonDocument.Parse(configuration));
        }
        catch (Exception ex)
        {
            Console.WriteLine("Could not load configuration with az login" + ex.Message);

            return null;
        }

        string? GetAzureCliToken()
        {
            try
            {
                var credential = new AzureCliCredential();
                var requestContext = new TokenRequestContext(new[] { "https://vault.azure.net" });
                return credential.GetToken(requestContext).Token;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }

    private IDictionary<string, string?>? TryLoadConfigurationFromVault(
        string applicationName,
        string partName,
        string environment)
    {
        // we need a vault token to load the configuration from the vault otherwise we cannot
        // load the configuration from the vault
        if (_provider.ResolveVaultToken() is not { } vaultToken)
        {
            return null;
        }

        // we need a decryption key to decrypt the configuration from the vault otherwise we dont
        // even try to load the configuration from the vault
        if (_provider.ResolveDecryptionKey() is not { } decryptionKey)
        {
            return null;
        }

        // we need a vault url to load the configuration from the vault
        if (_provider.ResolveVaultUrl() is not { } vaultUrl)
        {
            return null;
        }

        Console.WriteLine("Loading configuration with vault token");

        // we use the vault client to load the configuration from the vault. The configuration
        // provider only has a synchronous interface so we need to use the GetAwaiter().GetResult().
        // Not nice but it works.
        var client = VaultClientFactory.CreateClient(vaultToken);
        var response = client
            .GetAsync(applicationName, partName, environment, vaultToken, CancellationToken.None)
            .GetAwaiter()
            .GetResult();

        if (response is not var (cypher, iv))
        {
            return null;
        }

        try
        {
            var decrypted = InMemoryCryptoProvider.From(decryptionKey).DecryptAsync(cypher, iv);

            return JsonConfigurationFileParser.ParseJson(JsonDocument.Parse(decrypted));
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Could not load configuration with vault token: {ex.Message}");

            return null;
        }
    }

    private static IDataProtector CreateProtector() => new ServiceCollection().AddDataProtection()
        .SetApplicationName("Confix_Token")
        .Services
        .BuildServiceProvider()
        .GetRequiredService<IDataProtectionProvider>()
        .CreateProtector("Confix_Token");

    private static string GetTokenFromFile(string name, string partName, string environmentName)
        => Path.Combine(Directory.GetCurrentDirectory(),
            $"{name}_{partName}_{environmentName}_confix.vaultconfig.json");
}

static file class LocalExtensions
{
    public static string EnsureSlashGraphQL(this string url)
    {
        var builder = new UriBuilder(url);
        if (!builder.Path.Trim('/').EndsWith("/graphql"))
        {
            builder.Path += Path.Join(builder.Path.Trim('/'), "graphql/");
        }

        return builder.Uri.ToString();
    }

    public static string? FetchLatestPublishedVersion(
        this IAuthoringClient client,
        string applicationName,
        string partName,
        string environment)
    {
        var result = client.GetLatestPublishedVersion
            .ExecuteAsync(applicationName, partName, environment)
            .GetAwaiter()
            .GetResult()
            .Data?.LatestPublishedVersion;

        if (result is GetLatestPublishedVersion_LatestPublishedVersion_LatestPublishedVersion
            version)
        {
            return version.Configuration;
        }

        return null;
    }
}
