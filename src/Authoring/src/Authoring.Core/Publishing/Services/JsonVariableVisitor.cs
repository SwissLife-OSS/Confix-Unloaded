using System.Text.Json.Nodes;

namespace Confix.Authoring.Publishing;

public class JsonVariableVisitor
{
    public virtual void Visit(JsonNode node, JsonVariableVisitorContext context)
    {
        switch (node)
        {
            case JsonObject ob:
                Visit(ob, context);
                break;
            case JsonValue val:
                Visit(val, context);
                break;
            case JsonArray arr:
                Visit(arr, context);
                break;
        }
    }

    protected virtual void Visit(JsonObject obj, JsonVariableVisitorContext context)
    {
        foreach (var element in obj)
        {
            if (element.Value is not null)
            {
                context.SetValue.Push(value => obj[element.Key] = value);
                Visit(element.Value, context);
                context.SetValue.Pop();
            }
        }
    }

    protected virtual void Visit(JsonArray arr, JsonVariableVisitorContext context)
    {
        for (var i = 0; i < arr.Count; i++)
        {
            JsonNode? element = arr[i];
            if (element is not null)
            {
                var index = i;
                context.SetValue.Push(value =>
                {
                    arr[index] = value;
                });
                Visit(element, context);
                context.SetValue.Pop();
            }
        }
    }

    protected void Visit(JsonValue value, JsonVariableVisitorContext context)
    {
        if (value.TryGetValue(out string? str) &&
            str.Length > 2 &&
            str[0] == '{' &&
            str[^1] == '}')
        {
            string variableName = str[1..^1];
            context.Variables.Add(new VariableMatch(variableName, context.SetValue.Peek()));
        }
    }

    public static readonly JsonVariableVisitor Default = new();
}
