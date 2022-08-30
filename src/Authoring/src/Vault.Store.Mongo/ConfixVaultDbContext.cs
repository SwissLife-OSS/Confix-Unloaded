using Confix.Vault.Abstractions;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;
using MongoDB.Extensions.Context;
using MongoDB.Extensions.Transactions;

namespace Confix.Vault.Store.Mongo;

public class ConfixVaultDbContext : MongoDbContext, IConfixVaultDbContext
{
    public ConfixVaultDbContext(MongoOptions mongoOptions)
        : base(mongoOptions)
    {
    }

    protected override void OnConfiguring(IMongoDatabaseBuilder builder)
    {
        builder
            .RegisterSerializer(new DateTimeOffsetSerializer(BsonType.String))
            .ConfigureConnection(con => con.ReadConcern = ReadConcern.Majority)
            .ConfigureConnection(con => con.WriteConcern = WriteConcern.WMajority)
            .ConfigureConnection(con => con.ReadPreference = ReadPreference.Primary)
            .ConfigureCollection(new ConfigurationCollectionConfiguration());
    }

    public IMongoCollection<Configuration> Configurations
        => CreateCollection<Configuration>().AsTransactionCollection();
}
