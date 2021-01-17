using MongoDB.Driver;

namespace Confix.Authoring.Store.Mongo
{
    public interface IConfixAuthorDbContext
    {
        IMongoCollection<Application> Applications { get; }
    }
}