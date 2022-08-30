using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.Extensions.Options;
using Vault.Host.Configuration.Transport;

namespace Confix.Vault.Client;

public class VaultClient : IVaultClient
{
    public static string HttpClientName = "configuration_client";

    private readonly IHttpClientFactory _clientFactory;
    private readonly IOptionsMonitor<VaultClientOptions> _options;

    public VaultClient(
        IHttpClientFactory clientFactory,
        IOptionsMonitor<VaultClientOptions> options)
    {
        _clientFactory = clientFactory;
        _options = options;
    }

    public async Task<string> CreateAsync(
        string applicationName,
        string applicationPartName,
        string environmentName,
        string configuration,
        CancellationToken cancellationToken)
    {
        UriBuilder uriBuilder = new(_options.CurrentValue.RequestUri)
        {
            Path = "Configuration",
        };

        PutConfigurationRequest payload =
            new(applicationName, applicationPartName, environmentName, configuration);

        HttpRequestMessage request = new()
        {
            Method = HttpMethod.Put,
            RequestUri = uriBuilder.Uri,
            Content = JsonContent.Create(payload)
        };

        PutConfigurationResponse repsonse =
            await RequestAsync<PutConfigurationResponse>(request, cancellationToken);

        return repsonse.ApiKey;
    }

    public async Task<JsonDocument?> GetAsync(
        string applicationName,
        string applicationPartName,
        string environmentName,
        string apiKey,
        CancellationToken cancellationToken)
    {
        UriBuilder uriBuilder = new(_options.CurrentValue.RequestUri)
        {
            Path = "Configuration",
            Query = new QueryBuilder()
               .AddParameter("applicationName", applicationName)
               .AddParameter("applicationPartName", applicationPartName)
               .AddParameter("environmentName", environmentName)
               .AddParameter("apiKey", apiKey)
               .ToQueryString()
               .Value
        };

        HttpRequestMessage request = new()
        {
            Method = HttpMethod.Get,
            RequestUri = uriBuilder.Uri,
        };

        GetConfigurationResponse repsonse =
            await RequestAsync<GetConfigurationResponse>(request, cancellationToken);

        return repsonse.Configuration;
    }

    private async Task<T> RequestAsync<T>(
        HttpRequestMessage request,
        CancellationToken cancellationToken)
    {
        using HttpClient client = _clientFactory.CreateClient(HttpClientName);
        HttpResponseMessage response = await client.SendAsync(request, cancellationToken);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<T>(cancellationToken: cancellationToken)
            ?? throw new HttpRequestException(
                $"Could not deserialize result into {typeof(T).Name}");
    }
}
