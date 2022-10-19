using Confix.Common;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Extensions.Context;

namespace Confix.Vault.Store.Mongo;

public static class MongoStoreServiceCollectionExtensions
{
    public static IVaultServerBuilder UseMongoDbStores(
        this IVaultServerBuilder builder,
        string pathToConfig = Settings.Confix.Vault.Database.Mongo.Section)
    {
        builder.Services
            .AddOptions<MongoOptions>(nameof(VaultDbContext))
            .BindConfiguration(pathToConfig);

        builder.Services.AddSingleton<IVaultDbContext, VaultDbContext>();
        builder.Services.AddSingleton<IConfigurationStore, ConfigurationStore>();
        return builder;
    }
}
