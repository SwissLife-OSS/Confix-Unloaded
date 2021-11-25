using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using GreenDonut;

namespace Confix.Authoring.DataLoaders;

public class EnvironmentByIdDataLoader : BatchDataLoader<Guid, Environment?>
{
    private readonly IEnvironmentService _applicationService;

    public EnvironmentByIdDataLoader(
        IEnvironmentService applicationService,
        IBatchScheduler batchScheduler)
        : base(batchScheduler)
    {
        _applicationService = applicationService;
    }

    protected override async Task<IReadOnlyDictionary<Guid, Environment?>> LoadBatchAsync(
        IReadOnlyList<Guid> keys,
        CancellationToken cancellationToken)
    {
        IEnumerable<Environment> applications =
            await _applicationService.GetManyByIdAsync(
                keys,
                cancellationToken);

        return applications.ToDictionary(x => x.Id)!;
    }
}
