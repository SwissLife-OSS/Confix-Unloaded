using System.Net.Http.Json;
using System.Text.Json;
using Confix.Vault.Abstractions;
using Microsoft.AspNetCore.Http.Extensions;
using Vault.Host.Configuration.Transport;

namespace Confix.Vault.Client;

public sealed class VaultClient : IVaultClient
{
    public static string HttpClientName = "configuration_client";

    private readonly IHttpClientFactory _clientFactory;

    public VaultClient(IHttpClientFactory clientFactory)
    {
        _clientFactory = clientFactory;
    }

    public async Task<TokenPair> CreateAsync(
        string applicationName,
        string applicationPartName,
        string environmentName,
        string configuration,
        CancellationToken cancellationToken)
    {
        using var client = _clientFactory.CreateClient(HttpClientName);

        var uriBuilder = new UriBuilder(client.BaseAddress!) { Path = "Configuration" };

        var payload = new PutConfigurationRequest(
            applicationName,
            applicationPartName,
            environmentName,
            configuration);

        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Put,
            RequestUri = uriBuilder.Uri,
            Content = JsonContent.Create(payload)
        };

        var response =
            await RequestAsync<PutConfigurationResponse>(client, request, cancellationToken);

        return new TokenPair(response.Token, response.RefreshToken);
    }

    public async Task RefreshAsync(
        string applicationName,
        string applicationPartName,
        string environmentName,
        string configuration,
        string refreshToken,
        CancellationToken cancellationToken)
    {
        using var client = _clientFactory.CreateClient(HttpClientName);
        UriBuilder uriBuilder = new(client.BaseAddress!) { Path = "Configuration" };

        RefreshConfigurationRequest payload = new(
            applicationName,
            applicationPartName,
            environmentName,
            configuration,
            refreshToken);

        HttpRequestMessage request = new()
        {
            Method = HttpMethod.Patch,
            RequestUri = uriBuilder.Uri,
            Content = JsonContent.Create(payload)
        };

        await RequestAsync<RefreshConfigurationResponse>(client, request, cancellationToken);
    }

    public async Task<CypherAndIv?> GetAsync(
        string applicationName,
        string applicationPartName,
        string environmentName,
        string token,
        CancellationToken cancellationToken)
    {
        using var client = _clientFactory.CreateClient(HttpClientName);

        UriBuilder uriBuilder = new(client.BaseAddress!)
        {
            Path = "Configuration",
            Query = new QueryBuilder()
                .AddParameter("applicationName", applicationName)
                .AddParameter("applicationPartName", applicationPartName)
                .AddParameter("environmentName", environmentName)
                .AddParameter("token", token)
                .ToQueryString()
                .Value
        };

        HttpRequestMessage request = new() { Method = HttpMethod.Get, RequestUri = uriBuilder.Uri };

        var repsonse =
            await RequestAsync<GetConfigurationResponse>(client, request, cancellationToken);

        return repsonse.Configuration;
    }

    private static async Task<T> RequestAsync<T>(
        HttpMessageInvoker client,
        HttpRequestMessage request,
        CancellationToken cancellationToken)
    {
        var response = await client.SendAsync(request, cancellationToken);

        response.EnsureSuccessStatusCode();

        return await response.Content.ReadFromJsonAsync<T>(cancellationToken: cancellationToken) ??
            throw new HttpRequestException($"Could not deserialize result into {typeof(T).Name}");
    }
}
