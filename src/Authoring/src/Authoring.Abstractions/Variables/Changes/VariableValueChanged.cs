using System;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.Variables.Changes;

public class VariableValueChange : IVariableChange
{
    [GraphQLName("variable")]
    [UseDataLoader(typeof(IVariableDataLoader ))]
    public Guid VariableId { get; set; }

    public int VariableVersion { get; set; }

    public VariableKey Key { get; set; }

    public string Value { get; set; }

    public string Kind => nameof(VariableValueChange);
}
