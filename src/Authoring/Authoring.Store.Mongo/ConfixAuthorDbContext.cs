using Confix.Authoring.Store.Mongo.Configuration;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;
using MongoDB.Extensions.Context;

namespace Confix.Authoring.Store.Mongo
{
    public class ConfixAuthorDbContext : MongoDbContext, IConfixAuthorDbContext
    {
        public ConfixAuthorDbContext(MongoOptions mongoOptions)
            : base(mongoOptions)
        {
        }

        protected override void OnConfiguring(IMongoDatabaseBuilder builder)
        {
            builder
                .RegisterSerializer(new DateTimeOffsetSerializer(BsonType.String))
                .ConfigureConnection(con => con.ReadConcern = ReadConcern.Majority)
                .ConfigureConnection(con => con.WriteConcern = WriteConcern.WMajority)
                .ConfigureConnection(con => con.ReadPreference = ReadPreference.Primary)
                .ConfigureCollection(new ApplicationCollectionConfiguration());
        }

        public IMongoCollection<Application> Applications
        {
            get
            {
                return CreateCollection<Application>();
            }
        }
    }
}
