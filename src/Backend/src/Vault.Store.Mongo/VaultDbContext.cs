using Confix.Vault.Abstractions;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;
using MongoDB.Extensions.Context;
using MongoDB.Extensions.Transactions;

namespace Confix.Vault.Store.Mongo;

internal sealed class VaultDbContext : MongoDbContext, IVaultDbContext
{
    public VaultDbContext(IOptionsMonitor<MongoOptions> mongoOptions) : base(
        mongoOptions.Get(nameof(VaultDbContext)))
    {
    }

    public IMongoCollection<Configuration> Configurations
        => CreateCollection<Configuration>().AsTransactionCollection();

    protected override void OnConfiguring(IMongoDatabaseBuilder builder)
    {
        builder
            .RegisterSerializer(new DateTimeOffsetSerializer(BsonType.String))
            .ConfigureConnection(con => con.ReadConcern = ReadConcern.Majority)
            .ConfigureConnection(con => con.WriteConcern = WriteConcern.WMajority)
            .ConfigureConnection(con => con.ReadPreference = ReadPreference.Primary)
            .ConfigureCollection(new ConfigurationCollectionConfiguration());
    }
}
