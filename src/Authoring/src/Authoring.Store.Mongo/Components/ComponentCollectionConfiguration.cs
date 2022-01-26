using System;
using System.Text.Json;
using MongoDB.Driver;
using MongoDB.Extensions.Context;

namespace Confix.Authoring.Store.Mongo.Configuration;

internal class ComponentCollectionConfiguration :
    IMongoCollectionConfiguration<Component>
{
    public void OnConfiguring(
        IMongoCollectionBuilder<Component> builder)
    {
        builder
            .WithCollectionName("component")
            .AddBsonClassMap<Component>(cm =>
            {
                cm.AutoMap();
                cm.MapIdMember(c => c.Id);
            })
            .WithCollectionSettings(s => s.ReadConcern = ReadConcern.Majority)
            .WithCollectionSettings(s => s.ReadPreference = ReadPreference.Nearest)
            .WithCollectionConfiguration(collection =>
            {
                collection.Indexes.CreateOne(
                   new CreateIndexModel<Component>(
                       Builders<Component>.IndexKeys.Ascending(project => project.Name),
                       new CreateIndexOptions
                       {
                           Collation = new Collation(
                               "en",
                               strength: CollationStrength.Secondary),
                           Unique = true
                       }));
            });
    }
}
