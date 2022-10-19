using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Options;

namespace Confix.Authentication;

public static class ClientCredentialServiceCollectionExtensions
{
    public static void AddClientCredentialsClient(
        this IServiceCollection collection,
        string name,
        string configSectionPath)
    {
        collection.AddMemoryCache();

        collection.TryAddSingleton<IClientCredentialCache, ClientCredentialCache>();

        collection
            .AddOptions<ClientCredentialsClientOptions>(name)
            .BindConfiguration(configSectionPath)
            .Validate(x => !string.IsNullOrWhiteSpace(x.Authority), "Authority was not provided.")
            .Validate(x => !string.IsNullOrWhiteSpace(x.ClientId), "ClientId was not provided.")
            .Validate(x =>
                    !Uri.TryCreate(x.Url, UriKind.RelativeOrAbsolute, out _),
                "Provided string was not a valid url");

        collection
            .AddHttpClient(name)
            .ConfigureHttpClient(ConfigureClient)
            .AddHttpMessageHandler(ConfigureHandler);

        void ConfigureClient(IServiceProvider sp, HttpClient client)
        {
            var options = sp.GetRequiredService<IOptionsMonitor<ClientCredentialsClientOptions>>();
            client.BaseAddress = new Uri(options.CurrentValue.Url);
        }

        DelegatingHandler ConfigureHandler(IServiceProvider sp)
        {
            return new AddTokenMessageHandler(
                sp.GetRequiredService<IClientCredentialCache>(),
                sp.GetRequiredService<IOptionsMonitor<ClientCredentialsClientOptions>>(),
                name);
        }
    }
}
