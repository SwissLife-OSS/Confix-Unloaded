using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using GreenDonut;

namespace Confix.Authoring;

internal sealed class ChangeLogByApplicationPartComponentIdDataloader : GroupedDataLoader<Guid, ChangeLog?>
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
        IReadOnlyList<ChangeLog> changeLogs =
            await _store.GetByPartComponentIdAsync(keys, cancellationToken);

        return changeLogs
            .Where(x => x.Change is IApplicationPartComponentChange)
            .ToLookup(x => ((IApplicationPartComponentChange)x.Change).PartComponentId)!;
    }
}
