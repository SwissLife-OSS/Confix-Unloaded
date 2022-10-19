using System;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.DataLoaders;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Components;

[Node]
[ExtendObjectType(typeof(Component))]
public sealed class ComponentNode
{
    [NodeResolver]
    public static async Task<Component?> GetComponentAsync(
        Guid id,
        [Service] IComponentService service,
        CancellationToken cancellationToken) =>
        await service.GetByIdAsync(id, cancellationToken);
}
