using Confix.Authoring.Store;
using Confix.Authoring.Variables.Changes;
using GreenDonut;

namespace Confix.Authoring;

internal sealed class ChangeLogByVariableIdDataloader : GroupedDataLoader<Guid, ChangeLog?>
{
    private readonly IChangeLogStore _store;

    public ChangeLogByVariableIdDataloader(
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
        var changeLogs = await _store.GetByVariableIdAsync(keys, cancellationToken);

        return changeLogs
            .Where(x => x.Change is IVariableChange)
            .ToLookup(x => ((IVariableChange)x.Change).VariableId)!;
    }
}
