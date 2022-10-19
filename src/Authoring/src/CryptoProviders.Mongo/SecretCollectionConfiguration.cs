using MongoDB.Driver;
using MongoDB.Extensions.Context;


namespace Confix.CryptoProviders.Mongo;

internal sealed class SecretCollectionConfiguration :
    IMongoCollectionConfiguration<Secret>
{
    public void OnConfiguring(IMongoCollectionBuilder<Secret> builder)
    {
        builder
            .WithCollectionName("secrets")
            .AddBsonClassMap<Secret>(cm =>
            {
                cm.AutoMap();
                cm.MapIdMember(c => c.Id);
            })
            .WithCollectionSettings(s => s.ReadConcern = ReadConcern.Majority)
            .WithCollectionSettings(s => s.ReadPreference = ReadPreference.Nearest)
            .WithCollectionConfiguration(collection =>
            {
                collection.Indexes.CreateOne(
                   new CreateIndexModel<Secret>(
                       Builders<Secret>.IndexKeys.Ascending(project => project.Topic),
                       new CreateIndexOptions
                       {
                           Collation = new Collation("en", strength: CollationStrength.Secondary),
                           Unique = true
                       }));
            });
    }
}
