using Confix.Authoring.Store;
using GreenDonut;

namespace Confix.Authoring.DataLoaders;

internal sealed class ApplicationByIdDataLoader
    : BatchDataLoader<Guid, Application?>, IApplicationDataLoader
{
    private readonly IApplicationStore _applicationStore;

    public ApplicationByIdDataLoader(
        IApplicationStore applicationStore,
        IBatchScheduler batchScheduler,
        DataLoaderOptions? options = null) : base(batchScheduler, options)
    {
        _applicationStore = applicationStore;
    }

    protected override async Task<IReadOnlyDictionary<Guid, Application?>> LoadBatchAsync(
        IReadOnlyList<Guid> keys,
        CancellationToken cancellationToken)
    {
        IEnumerable<Application> applications =
            await _applicationStore.GetManyByIdAsync(keys, cancellationToken);

        return applications.ToDictionary(x => x.Id)!;
    }
}
