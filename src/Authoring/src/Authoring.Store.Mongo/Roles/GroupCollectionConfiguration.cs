using Confix.Authentication.Authorization;
using MongoDB.Driver;
using MongoDB.Extensions.Context;

namespace Confix.Authoring.Store.Mongo.Configuration;

internal class RoleCollectionConfiguration : IMongoCollectionConfiguration<Role>
{
    public void OnConfiguring(IMongoCollectionBuilder<Role> builder)
    {
        builder
            .WithCollectionName("roles")
            .AddBsonClassMap<Role>(cm =>
            {
                cm.AutoMap();
                cm.MapIdMember(c => c.Id);
            })
            .WithCollectionSettings(s => s.ReadConcern = ReadConcern.Majority)
            .WithCollectionSettings(s => s.ReadPreference = ReadPreference.Nearest)
            .WithCollectionConfiguration(collection =>
            {
            });
    }
}
