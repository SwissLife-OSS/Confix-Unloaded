using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using GreenDonut;
using HotChocolate.Fetching;

namespace Confix.Authoring.DataLoaders;

public class ComponentByIdDataLoader : BatchDataLoader<Guid, Component?>, IComponentDataLoader
{
    private readonly IComponentStore _componentStore;

    public ComponentByIdDataLoader(
        IComponentStore componentStore,
        IBatchScheduler batchScheduler)
        : base(batchScheduler)
    {
        _componentStore = componentStore;
    }

    protected override async Task<IReadOnlyDictionary<Guid, Component?>> LoadBatchAsync(
        IReadOnlyList<Guid> keys,
        CancellationToken cancellationToken)
    {
        IEnumerable<Component> components =
            await _componentStore.GetManyByIdAsync(
                keys,
                cancellationToken);

        return components.ToDictionary(x => x.Id)!;
    }
}
