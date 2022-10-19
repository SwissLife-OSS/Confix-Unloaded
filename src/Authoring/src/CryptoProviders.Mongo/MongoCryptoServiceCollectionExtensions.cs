using Confix.Common;
using Confix.CryptoProviders;
using Confix.CryptoProviders.Mongo;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Extensions.Context;

namespace Confix.Authoring.Store.Mongo;

public static class MongoCryptStoreServiceCollectionExtensions
{
    public static ICryptoProviderDescriptor UseMongoDbDataEncryptionKeys(
        this ICryptoProviderDescriptor services,
        string pathToConfig = Settings.Confix.Encryption.DataEncryptionKey.Mongo.Section)
    {
        services.Services
            .AddOptions<MongoOptions>(nameof(CryptoDbContext))
            .BindConfiguration(pathToConfig);

        services.Services.AddSingleton<ICryptoDbContext, CryptoDbContext>();
        services.Services.AddSingleton<IDataEncryptionKeyRepository, DataEncryptionKeyRepository>();

        return services;
    }
}
