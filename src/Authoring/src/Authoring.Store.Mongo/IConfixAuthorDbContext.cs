using Confix.Authoring.Publishing;
using MongoDB.Driver;

namespace Confix.Authoring.Store.Mongo;

public interface IConfixAuthorDbContext
{
    IMongoCollection<Application> Applications { get; }

    IMongoCollection<ChangeLog> ChangeLogs { get; }

    IMongoCollection<Environment> Environments { get; }

    IMongoCollection<Component> Components { get; }

    IMongoCollection<Variable> Variables { get; }

    IMongoCollection<VariableValue> VariableValues { get; }

    IMongoCollection<PublishedApplicationPart> PublishedApplicationParts { get; }

    IMongoCollection<ClaimedVersion> ClaimedVersions { get; }
}
