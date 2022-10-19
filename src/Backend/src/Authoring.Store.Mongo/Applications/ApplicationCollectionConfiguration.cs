using MongoDB.Driver;
using MongoDB.Extensions.Context;

namespace Confix.Authoring.Store.Mongo.Configuration;

internal sealed class ApplicationCollectionConfiguration :
    IMongoCollectionConfiguration<Application>
{
    public void OnConfiguring(
        IMongoCollectionBuilder<Application> builder)
    {
        builder
            .WithCollectionName("application")
            .AddBsonClassMap<Application>(cm =>
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
