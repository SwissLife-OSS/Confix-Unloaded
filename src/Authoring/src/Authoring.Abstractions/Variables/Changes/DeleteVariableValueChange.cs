using System;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.Variables.Changes;

public class DeleteVariableValueChange : IVariableChange
{
    public DeleteVariableValueChange(
        Guid variableId,
        int variableVersion,
        VariableValue variableValue,
        VariableKey key)
    {
        VariableId = variableId;
        VariableVersion = variableVersion;
        VariableValue = variableValue;
        Key = key;
    }

    [GraphQLName("variable")]
    [UseDataLoader(typeof(IVariableDataLoader))]
    public Guid VariableId { get; init; }

    public int VariableVersion { get; init; }

    public VariableKey Key { get; init; }

    public VariableValue VariableValue { get; init; }

    public string Kind => nameof(DeleteVariableValueChange);
}
