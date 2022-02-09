
using MongoDB.Driver;
using MongoDB.Extensions.Context;
using MongoDB.Extensions.Transactions;

namespace Confix.CryptoProviders.Mongo;

internal class ConfixCryptoDbContext : MongoDbContext, IConfixCryptoDbContext
{
    public ConfixCryptoDbContext(MongoOptions mongoOptions)
        : base(mongoOptions)
    {
    }

    protected override void OnConfiguring(IMongoDatabaseBuilder builder)
    {
        builder
            .ConfigureConnection(con => con.ReadConcern = ReadConcern.Majority)
            .ConfigureConnection(con => con.WriteConcern = WriteConcern.WMajority)
            .ConfigureConnection(con => con.ReadPreference = ReadPreference.Primary)
            .ConfigureCollection(new SecretCollectionConfiguration());
    }

    public IMongoCollection<Secret> Secrets
        => CreateCollection<Secret>().AsTransactionCollection();
}
