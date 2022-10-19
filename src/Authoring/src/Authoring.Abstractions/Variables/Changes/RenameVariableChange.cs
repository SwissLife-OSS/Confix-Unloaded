using System;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.Variables.Changes;

public sealed class RenameVariableChange : IVariableChange
{
    public RenameVariableChange(Guid variableId, int variableVersion, string name)
    {
        VariableId = variableId;
        VariableVersion = variableVersion;
        Name = name;
    }

    [GraphQLName("variable")]
    [UseDataLoader(typeof(IVariableDataLoader))]
    public Guid VariableId { get; init; }

    public int VariableVersion { get; init; }

    public string Name { get; init; }

    public string Kind => nameof(RenameVariableChange);
}
