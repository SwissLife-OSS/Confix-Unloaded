using MongoDB.Driver;
using MongoDB.Extensions.Context;

namespace Confix.Authoring.Store.Mongo.Configuration
{
    internal class VariableValueCollectionConfiguration :
        IMongoCollectionConfiguration<VariableValue>
    {
        public void OnConfiguring(
            IMongoCollectionBuilder<VariableValue> builder)
        {
            builder
                .WithCollectionName("variable_value")
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
                         Builders<VariableValue>.IndexKeys
                             .Descending(c => c.Key.VariableId),
                         new CreateIndexOptions { Unique = false });

                    var applicationIdIndex = new CreateIndexModel<VariableValue>(
                         Builders<VariableValue>.IndexKeys
                             .Descending(c => c.Key.ApplicationId),
                         new CreateIndexOptions { Unique = false });

                    var environmentIdIndex = new CreateIndexModel<VariableValue>(
                         Builders<VariableValue>.IndexKeys
                             .Descending(c => c.Key.EnvironmentId),
                         new CreateIndexOptions { Unique = false });

                    var partIdIndex = new CreateIndexModel<VariableValue>(
                         Builders<VariableValue>.IndexKeys
                             .Descending(c => c.Key.PartId),
                         new CreateIndexOptions { Unique = false });

                    var variableKeyCompoundIndex = new CreateIndexModel<VariableValue>(
                        Builders<VariableValue>.IndexKeys.Combine(
                            Builders<VariableValue>.IndexKeys.Ascending(di => di.Key.VariableId),
                            Builders<VariableValue>.IndexKeys.Ascending(di => di.Key.ApplicationId),
                            Builders<VariableValue>.IndexKeys.Descending(di => di.Key.PartId),
                            Builders<VariableValue>.IndexKeys.Descending(di => di.Key.EnvironmentId)),
                        new CreateIndexOptions
                        {
                            Unique = true,
                            Background = false
                        });

                    collection.Indexes.CreateMany(new[]
                    {
                        variableIdIndex,
                        applicationIdIndex,
                        environmentIdIndex,
                        partIdIndex,
                        variableKeyCompoundIndex
                    });
                });
        }
    }
}
