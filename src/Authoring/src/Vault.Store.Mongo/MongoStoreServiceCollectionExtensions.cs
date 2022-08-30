using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Extensions.Context;

namespace Confix.Vault.Store.Mongo;

public static class MongoStoreServiceCollectionExtensions
{
    public static IServiceCollection AddMongoStore(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        MongoOptions options =
            configuration.GetSection("Vault:Storage:Database").Get<MongoOptions>();

        services.AddSingleton<IConfixVaultDbContext>(new ConfixVaultDbContext(options));
        services.AddSingleton<IConfigurationStore, ConfigurationStore>();
        return services;
    }
}
