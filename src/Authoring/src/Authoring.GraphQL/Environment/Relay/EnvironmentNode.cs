using System;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.DataLoaders;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Relay;

[Node]
[ExtendObjectType(typeof(Environment))]
public class EnvironmentNode
{
    [NodeResolver]
    public static async Task<Environment?> GetEnvironmentAsync(
        Guid id,
        EnvironmentByIdDataLoader environmentById,
        CancellationToken cancellationToken) =>
        await environmentById.LoadAsync(id, cancellationToken);
}
