using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using GreenDonut;

namespace Confix.Authoring.DataLoaders;

internal sealed class EnvironmentByIdDataLoader : BatchDataLoader<Guid, Environment?>
{
    private readonly IEnvironmentStore _applicationStore;

    public EnvironmentByIdDataLoader(
        IEnvironmentStore applicationStore,
        IBatchScheduler batchScheduler,
        DataLoaderOptions? options = null) : base(batchScheduler, options)
    {
        _applicationStore = applicationStore;
    }

    protected override async Task<IReadOnlyDictionary<Guid, Environment?>> LoadBatchAsync(
        IReadOnlyList<Guid> keys,
        CancellationToken cancellationToken)
    {
        IEnumerable<Environment> applications =
            await _applicationStore.GetManyByIdAsync(keys, cancellationToken);

        return applications.ToDictionary(x => x.Id)!;
    }
}
