using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using GreenDonut;

namespace Confix.Authoring;

public class ChangeLogByApplicationIdDataloader : GroupedDataLoader<Guid, ChangeLog?>
{
    private readonly IChangeLogStore _store;

    public ChangeLogByApplicationIdDataloader(
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
            await _store.GetByApplicationIdsAsync(keys, cancellationToken);

        return changeLogs
            .Where(x => x.Change is IApplicationChange)
            .ToLookup(x => ((IApplicationChange)x.Change).ApplicationId)!;
    }
}
