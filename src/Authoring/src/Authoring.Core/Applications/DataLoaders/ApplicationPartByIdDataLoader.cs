using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using GreenDonut;

namespace Confix.Authoring.DataLoaders;

public class ApplicationPartByIdDataLoader
    : BatchDataLoader<Guid, ApplicationPart?>
    , IApplicationPartDataLoader
{
    private readonly IApplicationStore _applicationStore;

    public ApplicationPartByIdDataLoader(
        IApplicationStore applicationStore,
        IBatchScheduler batchScheduler)
        : base(batchScheduler)
    {
        _applicationStore = applicationStore;
    }

    protected override async Task<IReadOnlyDictionary<Guid, ApplicationPart?>> LoadBatchAsync(
        IReadOnlyList<Guid> keys,
        CancellationToken cancellationToken)
    {
        IEnumerable<ApplicationPart>? parts =
            await _applicationStore
                .GetManyPartsByIdAsync(keys, cancellationToken);

        return parts.ToDictionary(x => x.Id)!;
    }
}
