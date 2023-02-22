using System.Diagnostics;
using System.Text.Json;
using Microsoft.Extensions.Configuration;

namespace ConfiX;

/// <summary>
/// This is the same implementen
/// </summary>
internal sealed class JsonConfigurationFileParser
{
    private JsonConfigurationFileParser() { }

    private readonly Dictionary<string, string?> _data = new(StringComparer.OrdinalIgnoreCase);

    private readonly Stack<string> _paths = new Stack<string>();

    private IDictionary<string, string?> Parse(JsonDocument doc)
    {
        if (doc.RootElement.ValueKind != JsonValueKind.Object)
        {
            throw new FormatException("The root element was not an object.");
        }

        VisitElement(doc.RootElement);

        return _data;
    }

    private void VisitElement(JsonElement element)
    {
        var isEmpty = true;

        foreach (JsonProperty property in element.EnumerateObject())
        {
            isEmpty = false;
            EnterContext(property.Name);
            VisitValue(property.Value);
            ExitContext();
        }

        if (isEmpty && _paths.Count > 0)
        {
            _data[_paths.Peek()] = null;
        }
    }

    private void VisitValue(JsonElement value)
    {
        Debug.Assert(_paths.Count > 0);

        switch (value.ValueKind)
        {
            case JsonValueKind.Object:
                VisitElement(value);
                break;

            case JsonValueKind.Array:
                int index = 0;
                foreach (JsonElement arrayElement in value.EnumerateArray())
                {
                    EnterContext(index.ToString());
                    VisitValue(arrayElement);
                    ExitContext();
                    index++;
                }

                break;

            case JsonValueKind.Number:
            case JsonValueKind.String:
            case JsonValueKind.True:
            case JsonValueKind.False:
            case JsonValueKind.Null:
                string key = _paths.Peek();
                if (_data.ContainsKey(key))
                {
                    throw new FormatException($"The key {key} is duplicated ");
                }

                _data[key] = value.ToString();
                break;

            default:
                throw new FormatException(
                    $"""Unkown Json value kind "{value.ValueKind}" encountered.""");
        }
    }

    private void EnterContext(string context) =>
        _paths.Push(_paths.Count > 0
            ? _paths.Peek() + ConfigurationPath.KeyDelimiter + context
            : context);

    private void ExitContext() => _paths.Pop();

    public static IDictionary<string, string?> ParseJson(JsonDocument doc)
        => new JsonConfigurationFileParser().Parse(doc);
}
