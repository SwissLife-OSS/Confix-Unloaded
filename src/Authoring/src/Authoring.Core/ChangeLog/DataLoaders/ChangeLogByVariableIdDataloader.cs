using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using Confix.Authoring.Variables.Changes;
using GreenDonut;

namespace Confix.Authoring;

public class ChangeLogByVariableIdDataloader : GroupedDataLoader<Guid, ChangeLog?>
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
        IReadOnlyList<ChangeLog> changeLogs =
            await _store.GetByVariableIdAsync(keys, cancellationToken);

        return changeLogs
            .Where(x => x.Change is IVariableChange)
            .ToLookup(x => ((IVariableChange)x.Change).VariableId)!;
    }
}
