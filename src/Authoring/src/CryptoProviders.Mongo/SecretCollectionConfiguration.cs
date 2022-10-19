using MongoDB.Driver;
using MongoDB.Extensions.Context;


namespace Confix.CryptoProviders.Mongo;

internal sealed class SecretCollectionConfiguration
    : IMongoCollectionConfiguration<DataEncryptionKey>
{
    public void OnConfiguring(IMongoCollectionBuilder<DataEncryptionKey> builder)
    {
        builder
            .WithCollectionName("data_encryption_keys")
            .AddBsonClassMap<DataEncryptionKey>(cm =>
            {
                cm.AutoMap();
                cm.MapIdMember(c => c.Id);
            })
            .WithCollectionSettings(s => s.ReadConcern = ReadConcern.Majority)
            .WithCollectionSettings(s => s.ReadPreference = ReadPreference.Nearest)
            .WithCollectionConfiguration(collection =>
            {
                collection.Indexes.CreateOne(
                    new CreateIndexModel<DataEncryptionKey>(
                        Builders<DataEncryptionKey>.IndexKeys.Ascending(project => project.Topic),
                        new CreateIndexOptions
                        {
                            Collation =
                                new Collation("en", strength: CollationStrength.Secondary),
                            Unique = true
                        }));
            });
    }
}
