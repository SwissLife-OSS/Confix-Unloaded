using Confix.Authentication.Authorization;
using Confix.Authoring.Publishing;
using MongoDB.Driver;

namespace Confix.Authoring.Store.Mongo;

internal interface IAuthoringDbContext
{
    IMongoCollection<Application> Applications { get; }

    IMongoCollection<ChangeLog> ChangeLogs { get; }

    IMongoCollection<Environment> Environments { get; }

    IMongoCollection<Component> Components { get; }

    IMongoCollection<Variable> Variables { get; }

    IMongoCollection<VariableValue> VariableValues { get; }

    IMongoCollection<PublishedApplicationPart> PublishedApplicationParts { get; }

    IMongoCollection<ClaimedVersion> ClaimedVersions { get; }

    IMongoCollection<Group> Groups { get; }

    IMongoCollection<Role> Roles { get; }
}
