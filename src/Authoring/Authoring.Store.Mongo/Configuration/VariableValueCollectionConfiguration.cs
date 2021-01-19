using MongoDB.Driver;
using MongoDB.Extensions.Context;

namespace Confix.Authoring.Store.Mongo.Configuration
{
    internal class VariableValueCollectionConfiguration :
        IMongoCollectionConfiguration<VariableValue>
    {
        public void OnConfiguring(
            IMongoCollectionBuilder<VariableValue> builder)
        {
            builder
                .WithCollectionName("variable_value")
                .AddBsonClassMap<VariableValue>(cm =>
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
}
