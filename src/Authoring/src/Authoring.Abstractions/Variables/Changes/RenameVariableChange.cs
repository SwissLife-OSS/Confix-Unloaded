using System;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.Variables.Changes;

public class RenameVariableChange : IVariableChange
{
    [GraphQLName("variable")]
    [UseDataLoader(typeof(IVariableDataLoader))]
    public Guid VariableId { get; set; }

    public int VariableVersion { get; set; }

    public string Name { get; set; }

    public string Kind => nameof(RenameVariableChange);
}
