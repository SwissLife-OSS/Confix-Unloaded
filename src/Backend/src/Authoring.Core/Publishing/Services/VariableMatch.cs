using System;
using System.Text.Json.Nodes;

namespace Confix.Authoring.Publishing;

internal sealed record VariableMatch(string VariableName, Action<JsonValue> SetValue);
