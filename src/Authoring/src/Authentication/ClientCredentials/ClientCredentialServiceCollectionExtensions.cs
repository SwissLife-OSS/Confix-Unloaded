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
            .Validate(x => !string.IsNullOrWhiteSpace(x.ClientId), "ClientId was not provided.");

        collection
            .AddHttpClient(name)
            .AddHttpMessageHandler(ConfigureHandler);

        DelegatingHandler ConfigureHandler(IServiceProvider sp)
        {
            return new AddTokenMessageHandler(
                sp.GetRequiredService<IClientCredentialCache>(),
                sp.GetRequiredService<IOptionsMonitor<ClientCredentialsClientOptions>>(),
                name);
        }
    }
}
