using Confix.Authentication.Authorization;
using MongoDB.Driver;
using MongoDB.Extensions.Context;

namespace Confix.Authoring.Store.Mongo.Configuration;

internal sealed class GroupCollectionConfiguration : IMongoCollectionConfiguration<Group>
{
    public void OnConfiguring(IMongoCollectionBuilder<Group> builder)
    {
        builder
            .WithCollectionName("groups")
            .AddBsonClassMap<Group>(
                cm =>
                {
                    cm.AutoMap();
                    cm.MapIdMember(c => c.Id);
                })
            .WithCollectionSettings(s => s.ReadConcern = ReadConcern.Majority)
            .WithCollectionSettings(s => s.ReadPreference = ReadPreference.Nearest);
    }
}
