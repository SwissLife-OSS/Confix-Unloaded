using Confix.Vault.Abstractions;
using MongoDB.Driver;
using MongoDB.Extensions.Context;
using static MongoDB.Driver.Builders<Confix.Vault.Abstractions.Configuration>;

namespace Confix.Vault.Store.Mongo;

internal sealed class ConfigurationCollectionConfiguration
    : IMongoCollectionConfiguration<Configuration>
{
    public void OnConfiguring(IMongoCollectionBuilder<Configuration> builder)
    {
        builder
            .WithCollectionName("configurations")
            .AddBsonClassMap<Configuration>(cm =>
            {
                cm.AutoMap();
                cm.MapIdMember(c => c.Id);
            })
            .WithCollectionSettings(s => s.ReadConcern = ReadConcern.Majority)
            .WithCollectionSettings(s => s.ReadPreference = ReadPreference.Nearest)
            .WithCollectionConfiguration(collection =>
            {
                CreateIndexModel<Configuration>[] indicies = new[]
                {
                    new CreateIndexModel<Configuration>(
                        IndexKeys.Combine(
                            IndexKeys.Ascending(x => x.ApplicationName),
                            IndexKeys.Ascending(x => x.EnvironmentName),
                            IndexKeys.Ascending(x => x.ApplicationPartName)
                        ),
                        new() { Name = "AppPartEnvLookup_Asc" })
                };
                collection.Indexes.CreateMany(indicies);
            });
    }
}
