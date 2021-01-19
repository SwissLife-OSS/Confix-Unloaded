using MongoDB.Driver;
using MongoDB.Extensions.Context;

namespace Confix.Authoring.Store.Mongo.Configuration
{
    internal class VariableCollectionConfiguration :
        IMongoCollectionConfiguration<Variable>
    {
        public void OnConfiguring(
            IMongoCollectionBuilder<Variable> builder)
        {
            builder
                .WithCollectionName("variable")
                .AddBsonClassMap<Variable>(cm =>
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
