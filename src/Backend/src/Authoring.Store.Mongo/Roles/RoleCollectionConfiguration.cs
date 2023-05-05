using Confix.Authentication.Authorization;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using MongoDB.Extensions.Context;

namespace Confix.Authoring.Store.Mongo.Configuration;

internal sealed class RoleCollectionConfiguration : IMongoCollectionConfiguration<Role>
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
            .AddBsonClassMap<Requirement>(x =>
            {
                x.SetIsRootClass(true);
                x.AutoMap();
            })
            .AddBsonClassMap<ClaimRequirement>(x => x.AutoMap())
            .WithCollectionSettings(s => s.ReadConcern = ReadConcern.Majority)
            .WithCollectionSettings(s => s.ReadPreference = ReadPreference.Nearest)
    }
}
