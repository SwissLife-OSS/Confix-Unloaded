using System;
using System.Text.Json.Nodes;

namespace Confix.Authoring.Publishing;

public record VariableMatch(string VariableName, Action<JsonValue> SetValue);
