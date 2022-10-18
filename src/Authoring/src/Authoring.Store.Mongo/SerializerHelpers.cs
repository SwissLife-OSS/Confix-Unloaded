using System.Collections.Immutable;
using MongoDB.Bson.Serialization;

namespace Confix.Authoring.Store.Mongo;

public class SerializerHelpers
{
    public static void RegisterSerializers()
    {
        ConfigureSerializers();
    }

    private static void ConfigureSerializers()
    {
        BsonSerializer.RegisterGenericSerializerDefinition(
            typeof(ImmutableHashSet<>),
            typeof(ImmutableHashSetSerializer<>));
    }
}
