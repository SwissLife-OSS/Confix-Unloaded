using Confix.Authentication.Authorization;
using Confix.Authoring.Publishing;
using Confix.Authoring.Store.Mongo.Configuration;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;
using MongoDB.Extensions.Context;
using MongoDB.Extensions.Transactions;

namespace Confix.Authoring.Store.Mongo;

internal sealed class AuthoringDbContext : MongoDbContext, IAuthoringDbContext
{
    public AuthoringDbContext(IOptionsMonitor<MongoOptions> mongoOptions)
        : base(mongoOptions.Get(nameof(AuthoringDbContext)))
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
            .ConfigureCollection(new ClaimedVersionCollectionConfiguration())
            .ConfigureCollection(new VariableValueCollectionConfiguration())
            .ConfigureCollection(new ComponentCollectionConfiguration())
            .ConfigureCollection(new GroupCollectionConfiguration())
            .ConfigureCollection(new RoleCollectionConfiguration());
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

    public IMongoCollection<ClaimedVersion> ClaimedVersions
        => CreateCollection<ClaimedVersion>().AsTransactionCollection();

    public IMongoCollection<Role> Roles
        => CreateCollection<Role>().AsTransactionCollection();

    public IMongoCollection<Group> Groups
        => CreateCollection<Group>().AsTransactionCollection();
}