using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.DataLoaders;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Components;

[ExtendObjectType(OperationTypeNames.Query)]
public class ComponentQueries
{
    [UsePaging]
    [UseFiltering(typeof(ComponentFilterInputType))]
    public async Task<IQueryable<Component>> GetComponents(
        [Service] IComponentService componentService,
        CancellationToken cancellationToken) =>
        await componentService.Query(cancellationToken);

    public Task<Component?> GetComponentByIdAsync(
        [ID(nameof(Component))] Guid id,
        ComponentByIdDataLoader componentById,
        CancellationToken cancellationToken) =>
        componentById.LoadAsync(id, cancellationToken);
}
