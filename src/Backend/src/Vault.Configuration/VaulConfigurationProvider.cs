using System.Text.Json;
using Confix.CryptoProviders.AzureKeyVault;
using Confix.Vault.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Memory;

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
        var client = new VaultClient(_clientFactory);
        var response = client
            .GetAsync(
                _source.Part.Name,
                _source.Part.PartName,
                _provider.ResolverEnvironment(),
                _provider.ResolveToken(_source.Part),
                CancellationToken.None)
            .GetAwaiter()
            .GetResult();

        if (response is not { })
        {
            throw new Exception(
                $"Could not load configuration from vault {_provider.ResolveVaultUrl()}");
        }

        var (cypher, iv) = response.RootElement.Deserialize<CypherAndIv>();

        var decryptred = InMemoryCryptoProvider
            .From(_provider.ResolveDecryptionKey())
            .DecryptAsync(cypher, iv);

        Data = JsonConfigurationFileParser.ParseJson(JsonDocument.Parse(decryptred));
    }

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
