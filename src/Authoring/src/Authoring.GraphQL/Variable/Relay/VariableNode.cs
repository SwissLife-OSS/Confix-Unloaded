using System;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL;

[Node]
[ExtendObjectType(typeof(Variable))]
public class VariableNode
{
    [NodeResolver]
    public static Task<Variable?> GetVariableAsync(
        Guid id,
        IVariableDataLoader variableById,
        CancellationToken cancellationToken)
        => variableById.LoadAsync(id, cancellationToken);
}
