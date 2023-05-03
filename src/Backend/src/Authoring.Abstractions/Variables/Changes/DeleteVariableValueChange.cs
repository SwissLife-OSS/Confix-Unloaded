using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.Variables.Changes;

public sealed class DeleteVariableValueChange : IVariableChange
{
    public DeleteVariableValueChange(
        Guid variableId,
        int variableVersion,
        VariableValue variableValue)
    {
        VariableId = variableId;
        VariableVersion = variableVersion;
        VariableValue = variableValue;
    }

    public VariableValue VariableValue { get; init; }

    [GraphQLName("variable")]
    [UseDataLoader(typeof(IVariableDataLoader))]
    public Guid VariableId { get; init; }

    public int VariableVersion { get; init; }

    public string Kind => nameof(DeleteVariableValueChange);
}
