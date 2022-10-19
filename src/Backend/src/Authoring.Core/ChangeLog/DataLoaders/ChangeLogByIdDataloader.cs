using Confix.Authoring.Store;
using GreenDonut;

namespace Confix.Authoring;

internal sealed class ChangeLogByIdDataloader : BatchDataLoader<Guid, ChangeLog?>
{
    private readonly IChangeLogStore _store;

    public ChangeLogByIdDataloader(
        IChangeLogStore store,
        IBatchScheduler batchScheduler,
        DataLoaderOptions? options = null) : base(batchScheduler, options)
    {
        _store = store;
    }

    protected override async Task<IReadOnlyDictionary<Guid, ChangeLog?>> LoadBatchAsync(
        IReadOnlyList<Guid> keys,
        CancellationToken cancellationToken)
    {
        var changeLogs = await _store.GetByIdsAsync(keys, cancellationToken);

        return changeLogs.ToDictionary(x => x.Id)!;
    }
}
