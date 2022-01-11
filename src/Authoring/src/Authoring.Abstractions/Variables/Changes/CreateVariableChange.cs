using System;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.Variables.Changes;

public class CreateVariableChange : IVariableChange
{
    public CreateVariableChange(Guid variableId, int variableVersion, Variable value)
    {
        VariableId = variableId;
        VariableVersion = variableVersion;
        Value = value;
    }

    [GraphQLName("variable")]
    [UseDataLoader(typeof(IVariableDataLoader))]
    public Guid VariableId { get; init; }

    public int VariableVersion { get; init; }

    public Variable Value { get; init; }

    public string Kind => nameof(CreateVariableChange);
}
