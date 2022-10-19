using Confix.Authoring.Store;
using GreenDonut;

namespace Confix.Authoring;

internal sealed class ChangeLogByApplicationPartComponentIdDataloader
    : GroupedDataLoader<Guid, ChangeLog?>
{
    private readonly IChangeLogStore _store;

    public ChangeLogByApplicationPartComponentIdDataloader(
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
        var changeLogs = await _store.GetByPartComponentIdAsync(keys, cancellationToken);

        return changeLogs
            .Where(x => x.Change is IApplicationPartComponentChange)
            .ToLookup(x => ((IApplicationPartComponentChange)x.Change).PartComponentId)!;
    }
}
