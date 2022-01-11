using System;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.Variables.Changes;

public class VariableValueChange : IVariableChange
{
    public VariableValueChange(Guid variableId, int variableVersion, VariableKey key, string value)
    {
        VariableId = variableId;
        VariableVersion = variableVersion;
        Key = key;
        Value = value;
    }

    [GraphQLName("variable")]
    [UseDataLoader(typeof(IVariableDataLoader))]
    public Guid VariableId { get; init; }

    public int VariableVersion { get; init; }

    public VariableKey Key { get; init; }

    public string Value { get; init; }

    public string Kind => nameof(VariableValueChange);
}
