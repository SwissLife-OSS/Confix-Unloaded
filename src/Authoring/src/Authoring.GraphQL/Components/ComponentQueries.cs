using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.GraphQL.DataLoaders;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Components
{
    [ExtendObjectType(OperationTypeNames.Query)]
    public class ComponentQueries
    {
        [UsePaging]
        public IQueryable<Component> GetComponents(
            [Service] IComponentService componentService) =>
            componentService.Query();

        public Task<Component?> GetComponentByIdAsync(
            [ID(nameof(Component))] Guid id,
            ComponentByIdDataLoader componentById,
            CancellationToken cancellationToken) =>
            componentById.LoadAsync(id, cancellationToken);
    }
}
