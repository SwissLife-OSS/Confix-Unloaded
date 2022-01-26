using System;
using System.Collections.Generic;
using System.Text.Json.Nodes;

namespace Confix.Authoring.Publishing;

public class JsonVariableVisitorContext
{
    public Stack<Action<JsonValue>> SetValue { get; } = new();

    public IList<VariableMatch> Variables { get; } = new List<VariableMatch>();
}
