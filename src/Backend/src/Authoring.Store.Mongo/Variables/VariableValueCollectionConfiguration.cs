using MongoDB.Driver;
using MongoDB.Extensions.Context;

namespace Confix.Authoring.Store.Mongo.Configuration;

internal sealed class VariableValueCollectionConfiguration
    : IMongoCollectionConfiguration<VariableValue>
{
    public void OnConfiguring(IMongoCollectionBuilder<VariableValue> builder)
    {
        builder.WithCollectionName("variable_value")
            .AddBsonClassMap<VariableValue>(cm =>
            {
                cm.AutoMap();
                cm.MapIdMember(c => c.Id);
            })
            .WithCollectionSettings(s => s.ReadConcern = ReadConcern.Majority)
            .WithCollectionSettings(s => s.ReadPreference = ReadPreference.Nearest)
            .WithCollectionConfiguration(collection =>
            {
                var variableIdIndex = new CreateIndexModel<VariableValue>(
                    Builders<VariableValue>.IndexKeys.Descending(c => c.VariableId),
                    new CreateIndexOptions { Unique = false });

                var applicationIdIndex = new CreateIndexModel<VariableValue>(
                    Builders<VariableValue>.IndexKeys.Descending("Scope.ApplicationId"),
                    new CreateIndexOptions { Unique = false });

                var environmentIdIndex = new CreateIndexModel<VariableValue>(
                    Builders<VariableValue>.IndexKeys.Descending(c => c.Scope.EnvironmentId),
                    new CreateIndexOptions { Unique = false });

                var partIdIndex = new CreateIndexModel<VariableValue>(
                    Builders<VariableValue>.IndexKeys.Descending("Scope.PartId"),
                    new CreateIndexOptions { Unique = false });

                var identifier = new CreateIndexModel<VariableValue>(
                    Builders<VariableValue>.IndexKeys.Ascending(x => x.Scope.Identifier),
                    new CreateIndexOptions { Unique = true, Background = false });

                collection.Indexes.CreateMany(new[]
                {
                    variableIdIndex,
                    applicationIdIndex,
                    environmentIdIndex,
                    partIdIndex,
                    identifier
                });
            });
    }
}
