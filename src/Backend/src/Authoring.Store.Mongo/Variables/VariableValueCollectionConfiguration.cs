using MongoDB.Driver;
using MongoDB.Extensions.Context;
using static MongoDB.Driver.Builders<Confix.Authoring.VariableValue>;

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
            .AddBsonClassMap<VariableValueScope>(cm => cm.SetIsRootClass(true))
            .AddBsonClassMap<NamespaceVariableValueScope>(cm => cm.AutoMap())
            .AddBsonClassMap<ApplicationVariableValueScope>(cm => cm.AutoMap())
            .AddBsonClassMap<ApplicationPartVariableValueScope>(cm => cm.AutoMap())
            .WithCollectionSettings(s => s.ReadConcern = ReadConcern.Majority)
            .WithCollectionSettings(s => s.ReadPreference = ReadPreference.Nearest)
            .WithCollectionConfiguration(collection =>
            {
                var variableIdIndex = new CreateIndexModel<VariableValue>(
                    IndexKeys.Descending(c => c.VariableId),
                    new CreateIndexOptions { Unique = false });

                var applicationIdIndex = new CreateIndexModel<VariableValue>(
                    IndexKeys.Descending("Scope.ApplicationId"),
                    new CreateIndexOptions { Unique = false });

                var environmentIdIndex = new CreateIndexModel<VariableValue>(
                    IndexKeys.Descending("Scope.EnvironmentId"),
                    new CreateIndexOptions { Unique = false });

                var partIdIndex = new CreateIndexModel<VariableValue>(
                    IndexKeys.Descending("Scope.PartId"),
                    new CreateIndexOptions { Unique = false });

                var identifier = new CreateIndexModel<VariableValue>(
                    IndexKeys.Combine(
                        IndexKeys.Descending(c => c.VariableId),
                        IndexKeys.Descending("Scope.ApplicationId"),
                        IndexKeys.Descending("Scope.EnvironmentId"),
                        IndexKeys.Descending("Scope.PartId")
                    ),
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
