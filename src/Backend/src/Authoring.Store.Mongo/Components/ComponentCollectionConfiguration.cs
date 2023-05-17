using MongoDB.Driver;
using MongoDB.Extensions.Context;

namespace Confix.Authoring.Store.Mongo.Configuration;

internal sealed class ComponentCollectionConfiguration : IMongoCollectionConfiguration<Component>
{
    public void OnConfiguring(IMongoCollectionBuilder<Component> builder)
    {
        // allow additional properties

        builder.WithCollectionName("component")
            .AddBsonClassMap<Component>(cm =>
            {
                cm.AutoMap();
                cm.MapIdMember(c => c.Id);
            })
            .AddBsonClassMap<ComponentScope>(cm => cm.SetIsRootClass(true))
            .AddBsonClassMap<NamespaceComponentScope>(cm => cm.AutoMap())
            .AddBsonClassMap<ApplicationComponentScope>(cm => cm.AutoMap())
            .AddBsonClassMap<ApplicationPartComponentScope>(cm => cm.AutoMap())
            .WithCollectionSettings(s => s.ReadConcern = ReadConcern.Majority)
            .WithCollectionSettings(s => s.ReadPreference = ReadPreference.Nearest)
            .WithCollectionConfiguration(collection =>
            {
                collection.Indexes.CreateOne(new CreateIndexModel<Component>(
                    Builders<Component>.IndexKeys.Ascending(project => project.Name),
                    new CreateIndexOptions
                    {
                        Collation = new Collation("en", strength: CollationStrength.Secondary),
                        Unique = true
                    }));
            });
    }
}
