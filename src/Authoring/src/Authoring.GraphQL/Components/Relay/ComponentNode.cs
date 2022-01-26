using System;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.DataLoaders;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Components;

[Node]
[ExtendObjectType(typeof(Component))]
public class ComponentNode
{
    [NodeResolver]
    public static async Task<Component?> GetComponentAsync(
        Guid id,
        ComponentByIdDataLoader componentById,
        CancellationToken cancellationToken) =>
        await componentById.LoadAsync(id, cancellationToken);
}
