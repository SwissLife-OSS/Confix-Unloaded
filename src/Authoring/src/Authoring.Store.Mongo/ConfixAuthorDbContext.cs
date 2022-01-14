using Confix.Authoring.Publishing;
using Confix.Authoring.Store.Mongo.Configuration;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;
using MongoDB.Extensions.Context;
using MongoDB.Extensions.Transactions;

namespace Confix.Authoring.Store.Mongo;

public class ConfixAuthorDbContext : MongoDbContext, IConfixAuthorDbContext
{
    public ConfixAuthorDbContext(MongoOptions mongoOptions)
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
            .ConfigureCollection(new ApplicationCollectionConfiguration())
            .ConfigureCollection(new EnvironmentCollectionConfiguration())
            .ConfigureCollection(new ChangeLogCollectionConfiguration())
            .ConfigureCollection(new VariableCollectionConfiguration())
            .ConfigureCollection(new PublishedApplicationPartCollectionConfiguration())
            .ConfigureCollection(new VariableValueCollectionConfiguration())
            .ConfigureCollection(new ComponentCollectionConfiguration());
    }

    public IMongoCollection<Application> Applications
        => CreateCollection<Application>().AsTransactionCollection();

    public IMongoCollection<ChangeLog> ChangeLogs
        => CreateCollection<ChangeLog>().AsTransactionCollection();

    public IMongoCollection<Environment> Environments
        => CreateCollection<Environment>().AsTransactionCollection();

    public IMongoCollection<Component> Components
        => CreateCollection<Component>().AsTransactionCollection();

    public IMongoCollection<Variable> Variables
        => CreateCollection<Variable>().AsTransactionCollection();

    public IMongoCollection<VariableValue> VariableValues
        => CreateCollection<VariableValue>().AsTransactionCollection();

    public IMongoCollection<PublishedApplicationPart> PublishedApplicationParts
        => CreateCollection<PublishedApplicationPart>().AsTransactionCollection();
}
