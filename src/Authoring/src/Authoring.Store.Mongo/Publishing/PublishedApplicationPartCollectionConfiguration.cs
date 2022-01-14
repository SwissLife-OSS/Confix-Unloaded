using Confix.Authoring.Publishing;
using MongoDB.Driver;
using MongoDB.Extensions.Context;
using static MongoDB.Driver.Builders<Confix.Authoring.Publishing.PublishedApplicationPart>;

namespace Confix.Authoring.Store.Mongo.Configuration;

internal class PublishedApplicationPartCollectionConfiguration
    : IMongoCollectionConfiguration<PublishedApplicationPart>
{
    public void OnConfiguring(IMongoCollectionBuilder<PublishedApplicationPart> builder)
    {
        builder
            .WithCollectionName("published_application_part")
            .AddBsonClassMap<PublishedApplicationPart>(cm =>
            {
                cm.AutoMap();
                cm.MapIdMember(c => c.Id);
            })
            .WithCollectionSettings(s => s.ReadConcern = ReadConcern.Majority)
            .WithCollectionSettings(s => s.ReadPreference = ReadPreference.Nearest)
            .WithCollectionConfiguration(collection =>
            {
                CreateIndexModel<PublishedApplicationPart>[] indexes =
                {
                    new(IndexKeys.Ascending(project => project.Part.Id),
                        new CreateIndexOptions { Name = "PartId_ASC" }
                    )
                };
                collection.Indexes.CreateMany(indexes);
            });
    }
}
