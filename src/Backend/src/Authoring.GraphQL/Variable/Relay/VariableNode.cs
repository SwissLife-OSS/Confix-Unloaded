using System;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL;

[Node]
[ExtendObjectType(typeof(Variable))]
public sealed class VariableNode
{
    [NodeResolver]
    public static Task<Variable?> GetVariableAsync(
        [Service] IVariableService service,
        Guid id,
        CancellationToken cancellationToken)
        => service.GetByIdAsync(id, cancellationToken);
}
