using MongoDB.Bson.Serialization;

namespace Confix.Authoring.Store;

public static class Database
{
    public static void RegisterClassMap<T>(Action<BsonClassMap<T>> configure)
    {
        if (BsonClassMap.IsClassMapRegistered(typeof(T)))
        {
            return;
        }

        BsonClassMap.RegisterClassMap(configure);
    }
}
