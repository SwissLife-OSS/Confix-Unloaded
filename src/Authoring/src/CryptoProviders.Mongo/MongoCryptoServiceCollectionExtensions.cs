using Confix.CryptoProviders;
using Confix.CryptoProviders.Mongo;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Extensions.Context;

namespace Confix.Authoring.Store.Mongo;

public static class MongoCryptStoreServiceCollectionExtensions
{
    public static IServiceCollection AddMongoSecrets(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        MongoOptions options =
            configuration.GetSection("Crypto:Storage:Database").Get<MongoOptions>();

        services.AddSingleton<IConfixCryptoDbContext>(new ConfixCryptoDbContext(options));
        services.AddSingleton<ISecretRepository, SecretRepository>();

        return services;
    }
}
