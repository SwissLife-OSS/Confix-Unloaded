using System;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.Variables.Changes;

public class DeleteVariableValueChange : IVariableChange
{
    [GraphQLName("variable")]
    [UseDataLoader(typeof(IVariableDataLoader ))]
    public Guid VariableId { get; set; }

    public int VariableVersion { get; set; }

    public VariableKey Key { get; set; }

    public VariableValue VariableValue { get; set; }

    public string Kind => nameof(DeleteVariableValueChange );
}
