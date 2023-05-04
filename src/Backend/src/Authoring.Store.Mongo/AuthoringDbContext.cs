using Confix.Authentication.ApiKey;
using Confix.Authentication.Authorization;
using Confix.Authoring.Publishing;
using Confix.Authoring.Store.Mongo.ApiKeys;
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
    public AuthoringDbContext(IOptionsMonitor<MongoOptions> mongoOptions) : base(
        mongoOptions.Get(nameof(AuthoringDbContext)))
    {
        Applications = CreateCollection<Application>().AsTransactionCollection();
        ChangeLogs = CreateCollection<ChangeLog>().AsTransactionCollection();
        Environments = CreateCollection<Environment>().AsTransactionCollection();
        Components = CreateCollection<Component>().AsTransactionCollection();
        Variables = CreateCollection<Variable>().AsTransactionCollection();
        VariableValues = CreateCollection<VariableValue>().AsTransactionCollection();
        PublishedApplicationParts =
            CreateCollection<PublishedApplicationPart>().AsTransactionCollection();
        ClaimedVersions = CreateCollection<ClaimedVersion>().AsTransactionCollection();
        Roles = CreateCollection<Role>().AsTransactionCollection();
        Groups = CreateCollection<Group>().AsTransactionCollection();
        ApiKeys = CreateCollection<ApiKey>().AsTransactionCollection();
    }

    public IMongoCollection<Application> Applications { get; }

    public IMongoCollection<ChangeLog> ChangeLogs { get; }

    public IMongoCollection<Environment> Environments { get; }

    public IMongoCollection<Component> Components { get; }

    public IMongoCollection<Variable> Variables { get; }

    public IMongoCollection<VariableValue> VariableValues { get; }

    public IMongoCollection<PublishedApplicationPart> PublishedApplicationParts { get; }

    public IMongoCollection<ClaimedVersion> ClaimedVersions { get; }

    public IMongoCollection<Role> Roles { get; }

    public IMongoCollection<ApiKey> ApiKeys { get; }

    public IMongoCollection<Group> Groups { get; }

    protected override void OnConfiguring(IMongoDatabaseBuilder builder)
    {
        builder
            .AddInstrumentation()
            .RegisterDefaultConventionPack()
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
            .ConfigureCollection(new RoleCollectionConfiguration())
            .ConfigureCollection(new ApiKeyCollectionConfiguration());
    }
}
