using Confix.Authoring.Changes;
using Confix.Authoring.Store;
using GreenDonut;

namespace Confix.Authoring;

internal sealed class ChangeLogByComponentIdDataloader : GroupedDataLoader<Guid, ChangeLog?>
{
    private readonly IChangeLogStore _store;

    public ChangeLogByComponentIdDataloader(
        IChangeLogStore store,
        IBatchScheduler batchScheduler,
        DataLoaderOptions? options = null) : base(batchScheduler, options)
    {
        _store = store;
    }

    protected override async Task<ILookup<Guid, ChangeLog?>> LoadGroupedBatchAsync(
        IReadOnlyList<Guid> keys,
        CancellationToken cancellationToken)
    {
        var changeLogs = await _store.GetByComponentIdAsync(keys, cancellationToken);

        return changeLogs
            .Where(x => x.Change is IComponentChange)
            .ToLookup(x => ((IComponentChange)x.Change).ComponentId)!;
    }
}
