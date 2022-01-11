using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using GreenDonut;

namespace Confix.Authoring.DataLoaders;

public class ApplicationPartComponentByIdDataloader
    : BatchDataLoader<Guid, ApplicationPartComponent?>, IApplicationPartComponentDataLoader
{
    private readonly IApplicationStore _applicationStore;

    public ApplicationPartComponentByIdDataloader(
        IApplicationStore applicationStore,
        IBatchScheduler batchScheduler)
        : base(batchScheduler)
    {
        _applicationStore = applicationStore;
    }

    protected override async Task<IReadOnlyDictionary<Guid, ApplicationPartComponent?>>
        LoadBatchAsync(
        IReadOnlyList<Guid> keys,
        CancellationToken cancellationToken)
    {
        IEnumerable<ApplicationPartComponent> parts =
            await _applicationStore
                .GetManyComponentPartsByIdAsync(keys, cancellationToken);

        return parts.ToDictionary(x => x.Id)!;
    }
}
