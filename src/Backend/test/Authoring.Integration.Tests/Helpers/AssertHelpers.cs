using System.Text.Json;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Snapshooter.Core.Serialization;
using StrawberryShake;

namespace Confix.Authoring.Integration.Tests;

public static class AssertHelpers
{
    public static void AssertNoErrors<T>(this IOperationResult<T> result) where T : class
    {
        Assert.NotNull(result);
        Assert.Empty(result.Errors);
    }

    public static void MatchSnapshot<T>(this IOperationResult<T> result) where T : class
    {
        result.Data.MatchSnapshot();
    }
}

internal class CustomSnapshotSerializerSettings : SnapshotSerializerSettings
{
    public override JsonSerializerSettings Extend(JsonSerializerSettings settings)
    {
        settings.Converters.Add(new JsonDocumentConverter());

        return settings;
    }
}

internal class JsonDocumentConverter : JsonConverter<JsonDocument>
{
    public override JsonDocument? ReadJson(
        JsonReader reader,
        Type objectType,
        JsonDocument? existingValue,
        bool hasExistingValue,
        Newtonsoft.Json.JsonSerializer serializer)
    {
        if (reader.TokenType == JsonToken.Null)
        {
            return default;
        }

        var jToken = JToken.Load(reader);
        var jsonString = jToken.ToString();

        return JsonDocument.Parse(jsonString);
    }

    public override void WriteJson(
        JsonWriter writer,
        JsonDocument? value,
        Newtonsoft.Json.JsonSerializer serializer)
    {
        if (value is null)
        { return; }
        string? jsonString = value.RootElement.ToString();
        var jToken = JToken.Parse(jsonString);
        jToken.WriteTo(writer);
    }
}
