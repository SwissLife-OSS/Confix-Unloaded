using Confix.Authoring.Publishing;
using MongoDB.Driver;
using MongoDB.Extensions.Context;

namespace Confix.Authoring.Store.Mongo.Configuration;

internal sealed class ClaimedVersionCollectionConfiguration
    : IMongoCollectionConfiguration<ClaimedVersion>
{
    public void OnConfiguring(IMongoCollectionBuilder<ClaimedVersion> builder)
    {
        builder
            .WithCollectionName("claimed_version")
            .AddBsonClassMap<ClaimedVersion>(cm =>
            {
                cm.AutoMap();
                cm.MapIdMember(c => c.Id);
            })
            .WithCollectionSettings(s => s.ReadConcern = ReadConcern.Majority)
            .WithCollectionSettings(s => s.ReadPreference = ReadPreference.Nearest)
            .WithCollectionConfiguration(collection =>
            {
                CreateIndexModel<ClaimedVersion>[] indexes =
                {
                    new(Builders<ClaimedVersion>.IndexKeys.Ascending(project => project.GitVersion),
                        new CreateIndexOptions { Name = "GitVersion_ASC" })
                };
                collection.Indexes.CreateMany(indexes);
            });
    }
}
