using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.Variables.Changes;

public sealed class CreateVariableChange : IVariableChange
{
    public CreateVariableChange(Guid variableId, int variableVersion, Variable? value)
    {
        VariableId = variableId;
        VariableVersion = variableVersion;
        Value = value;
    }

    public Variable? Value { get; init; }

    [GraphQLName("variable")]
    [UseDataLoader(typeof(IVariableDataLoader))]
    public Guid VariableId { get; init; }

    public int VariableVersion { get; init; }

    public string Kind => nameof(CreateVariableChange);
}
