using Confix.Vault.Client;

namespace Confix.Value.Configuration;

internal static class VaultClientFactory
{
    public static VaultClient CreateClient(string vaultUrl)
    {
        var clientFactory = new ConfigurationHttpClientFactory(vaultUrl);

        var client = new VaultClient(clientFactory);

        return client;
    }

    private sealed class ConfigurationHttpClientFactory : IHttpClientFactory
    {
        private readonly string _vaultUrl;

        public ConfigurationHttpClientFactory(string vaultUrl)
        {
            _vaultUrl = vaultUrl;
        }

        HttpClient IHttpClientFactory.CreateClient(string name)
        {
            return new HttpClient() { BaseAddress = new Uri(_vaultUrl) };
        }
    }
}
