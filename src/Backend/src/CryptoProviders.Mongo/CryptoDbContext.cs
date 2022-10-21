using Confix.CryptoProviders.Mongo;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Extensions.Context;
using MongoDB.Extensions.Transactions;

namespace Confix.CryptoProviders.Mongo;

internal sealed class CryptoDbContext : MongoDbContext, ICryptoDbContext
{
    public CryptoDbContext(IOptionsMonitor<MongoOptions> mongoOptions)
        : base(mongoOptions.Get(nameof(CryptoDbContext)))
    {
        Secrets = CreateCollection<DataEncryptionKey>().AsTransactionCollection();
    }

    public IMongoCollection<DataEncryptionKey> Secrets { get; }

    protected override void OnConfiguring(IMongoDatabaseBuilder builder)
    {
        builder
            .ConfigureConnection(con => con.ReadConcern = ReadConcern.Majority)
            .ConfigureConnection(con => con.WriteConcern = WriteConcern.WMajority)
            .ConfigureConnection(con => con.ReadPreference = ReadPreference.Primary)
            .ConfigureCollection(new SecretCollectionConfiguration());
    }
}
