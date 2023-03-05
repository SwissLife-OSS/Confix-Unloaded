using System.Text.Json;
using Azure.Core;
using Azure.Identity;
using Confix.CryptoProviders.AzureKeyVault;
using Confix.Vault.Client;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Value.Configuration;

public class VaultConfigurationProvider : ConfigurationProvider
{
    private readonly VaultConfigurationSource _source;
    private readonly VariableProvider _provider;
    private readonly ConfigurationHttpClientFactory _clientFactory;

    public VaultConfigurationProvider(VaultConfigurationSource source)
    {
        _source = source;
        _provider = new VariableProvider();
        _clientFactory = new ConfigurationHttpClientFactory(_provider);
    }

    public override void Load()
    {
        var environment = _provider.ResolverEnvironment();
        var part = _source.Part;
        var applicationName = part.Name;
        var partName = part.PartName;

        IDictionary<string, string>? data = null;

        if (_provider.ResolveVaultToken() is { } vaultToken)
        {
            var client = new VaultClient(_clientFactory);
            var response = client
                .GetAsync(
                    applicationName,
                    partName,
                    environment,
                    vaultToken,
                    CancellationToken.None)
                .GetAwaiter()
                .GetResult();

            if (response is { })
            {
                var (cypher, iv) = response.RootElement.Deserialize<CypherAndIv>();

                var decrypted = InMemoryCryptoProvider
                    .From(_provider.ResolveDecryptionKey())
                    .DecryptAsync(cypher, iv);

                data = JsonConfigurationFileParser.ParseJson(JsonDocument.Parse(decrypted));
            }
        }

        if (data is null && _provider.ResolveAuthoringUrl() is { } authoringUrl)
        {
            try
            {
                var credential = new AzureCliCredential();
                var requestContext = new TokenRequestContext(new[] { "https://vault.azure.net" });
                if (credential.GetToken(requestContext) is { } azureCliToken)
                {
                    var builder = new UriBuilder(authoringUrl);
                    if (!builder.Path.Trim('/').EndsWith("/graphql"))
                    {
                        builder.Path += Path.Join(builder.Path.Trim('/'), "graphql/");
                    }

                    var client =
                        ConfixClientFactory.CreateClient(builder.Uri.ToString(),
                            azureCliToken.Token);
                    var result = client.GetLatestPublishedVersion
                        .ExecuteAsync(applicationName, partName, environment)
                        .GetAwaiter()
                        .GetResult();

                    if (result.Data?.LatestPublishedVersion is
                        GetLatestPublishedVersion_LatestPublishedVersion_LatestPublishedVersion
                        {
                            Configuration: { } configuration
                        })
                    {
                        data = JsonConfigurationFileParser.ParseJson(
                            JsonDocument.Parse(configuration));
                    }
                }
            }
            catch
            {
                // swallow any exception as this would mean the configuration is not available
            }
        }

        var filepath = GetTokenFromFile(_source.Part.Name, _source.Part.PartName, environment);
        var protector = CreateProtector();

        if (data is not null)
        {
            if (File.Exists(filepath))
            {
                File.Delete(filepath);
            }

            File.WriteAllText(filepath, protector.Protect(JsonSerializer.Serialize(data)));
        }

        if (data is null)
        {
            try
            {
                if (File.Exists(filepath))
                {
                    var configuration = File.ReadAllBytes(filepath);
                    var result = JsonDocument.Parse(protector.Unprotect(configuration));
                    data = JsonConfigurationFileParser.ParseJson(result);
                }
            }
            catch
            {
                // swallow any exception as this would mean messed up
            }
        }

        if (data is null)
        {
            throw new Exception("Could not load configruation");
        }

        Data = data;
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

    private sealed class ConfigurationHttpClientFactory : IHttpClientFactory
    {
        private readonly VariableProvider _variableProvider;

        public ConfigurationHttpClientFactory(VariableProvider variableProvider)
        {
            _variableProvider = variableProvider;
        }

        public HttpClient CreateClient(string name)
        {
            return new HttpClient() { BaseAddress = new Uri(_variableProvider.ResolveVaultUrl()) };
        }
    }
}
