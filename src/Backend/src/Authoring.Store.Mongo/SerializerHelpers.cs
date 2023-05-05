using System.Collections.Immutable;
using MongoDB.Bson.Serialization;

namespace Confix.Authoring.Store.Mongo;

internal static class SerializerHelpers
{
    private static bool _isConfigured;

    public static void RegisterSerializers()
    {
        if (!_isConfigured)
        {
            return;
        }

        ConfigureSerializers();

        _isConfigured = true;
    }

    private static void ConfigureSerializers()
    {
        BsonSerializer.RegisterGenericSerializerDefinition(
            typeof(ImmutableHashSet<>),
            typeof(ImmutableHashSetSerializer<>));
    }
}
