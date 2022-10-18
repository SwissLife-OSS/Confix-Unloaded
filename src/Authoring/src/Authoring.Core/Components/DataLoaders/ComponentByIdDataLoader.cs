using Confix.Authoring.Store;
using GreenDonut;

namespace Confix.Authoring.DataLoaders;

public class ComponentByIdDataLoader : BatchDataLoader<Guid, Component?>, IComponentDataLoader
{
    private readonly IComponentStore _componentStore;

    public ComponentByIdDataLoader(
        IComponentStore componentStore,
        IBatchScheduler batchScheduler,
        DataLoaderOptions? options = null) : base(batchScheduler, options)
    {
        _componentStore = componentStore;
    }

    protected override async Task<IReadOnlyDictionary<Guid, Component?>> LoadBatchAsync(
        IReadOnlyList<Guid> keys,
        CancellationToken cancellationToken)
    {
        IReadOnlyCollection<Component> components =
            await _componentStore.GetManyByIdAsync(
                keys,
                cancellationToken);

        return components.ToDictionary(x => x.Id)!;
    }
}
