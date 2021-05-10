using System;
using System.Collections.Generic;
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
        public Task<IEnumerable<Component>> GetComponentsAsync(
            [Service] IComponentService componentService,
            CancellationToken cancellationToken) =>
            componentService.GetAllAsync(cancellationToken);

        public Task<Component?> GetComponentByIdAsync(
            [ID(nameof(Component))] Guid id,
            ComponentByIdDataLoader componentById,
            CancellationToken cancellationToken) =>
            componentById.LoadAsync(id, cancellationToken);
    }
}
