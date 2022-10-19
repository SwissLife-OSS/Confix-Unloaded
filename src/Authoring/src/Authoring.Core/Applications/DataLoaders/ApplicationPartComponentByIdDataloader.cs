using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using GreenDonut;

namespace Confix.Authoring.DataLoaders;

internal sealed class ApplicationPartComponentByIdDataloader
    : BatchDataLoader<Guid, ApplicationPartComponent?>, IApplicationPartComponentDataLoader
{
    private readonly IApplicationStore _applicationStore;

    public ApplicationPartComponentByIdDataloader(
        IApplicationStore applicationStore,
        IBatchScheduler batchScheduler,
        DataLoaderOptions? options = null) : base(batchScheduler, options)
    {
        _applicationStore = applicationStore;
    }

    protected override async Task<IReadOnlyDictionary<Guid, ApplicationPartComponent?>>
        LoadBatchAsync(
        IReadOnlyList<Guid> keys,
        CancellationToken cancellationToken)
    {
        var idSet = keys.ToHashSet();

        IEnumerable<Application> apps =
            await _applicationStore.GetApplicationsByComponentIdAsync(keys, cancellationToken);

        return apps.SelectMany(x => x.Parts)
            .SelectMany(x => x.Components)
            .Where(x => idSet.Contains(x.Id))
            .DistinctBy(x => x.Id)
            .ToDictionary(x => x.Id)!;
    }
}
