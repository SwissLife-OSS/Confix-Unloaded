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
        IBatchScheduler batchScheduler,
        DataLoaderOptions? options = null) : base(batchScheduler, options)
    {
        _applicationStore = applicationStore;
    }

    protected override async Task<IReadOnlyDictionary<Guid, ApplicationPart?>> LoadBatchAsync(
        IReadOnlyList<Guid> keys,
        CancellationToken cancellationToken)
    {
        var ids = keys.ToHashSet();

        IEnumerable<Application> apps =
            await _applicationStore.GetApplicationsByPartIdsAsync(keys, cancellationToken);

        return apps
            .SelectMany(x => x.Parts)
            .Where(x => ids.Contains(x.Id))
            .ToDictionary(x => x.Id)!;
    }
}
