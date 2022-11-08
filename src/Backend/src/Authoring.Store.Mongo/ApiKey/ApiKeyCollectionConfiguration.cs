using Confix.Authentication.ApiKey;
using Confix.Authentication.Authorization;
using MongoDB.Driver;
using MongoDB.Extensions.Context;

namespace Confix.Authoring.Store.Mongo.ApiKeys;

internal sealed class ApiKeyCollectionConfiguration : IMongoCollectionConfiguration<ApiKey>
{
    public void OnConfiguring(IMongoCollectionBuilder<ApiKey> builder)
    {
        builder
            .WithCollectionName("api_keys")
            .AddBsonClassMap<Role>(cm =>
            {
                cm.AutoMap();
                cm.MapIdMember(c => c.Id);
            })
            .WithCollectionSettings(s => s.ReadConcern = ReadConcern.Majority)
            .WithCollectionSettings(s => s.ReadPreference = ReadPreference.Nearest)
            .WithCollectionConfiguration(_ =>
            {
                _.Indexes.CreateMany(new CreateIndexModel<ApiKey>[]
                {
                    new(Builders<ApiKey>.IndexKeys.Ascending(x => x.KeyPrefix),
                        new CreateIndexOptions() { Name = "ApiKeys_Prefix_Asc" })
                });
            });
    }
}
