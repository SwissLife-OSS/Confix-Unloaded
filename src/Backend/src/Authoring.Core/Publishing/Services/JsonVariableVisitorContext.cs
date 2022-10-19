using System.Text.Json.Nodes;

namespace Confix.Authoring.Publishing;

internal sealed class JsonVariableVisitorContext
{
    public Stack<Action<JsonValue>> SetValue { get; } = new();

    public IList<VariableMatch> Variables { get; } = new List<VariableMatch>();
}
