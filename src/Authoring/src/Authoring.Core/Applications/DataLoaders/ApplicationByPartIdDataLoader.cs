using Confix.Authoring.Store;
using GreenDonut;

namespace Confix.Authoring.DataLoaders;

public class ApplicationByPartIdDataLoader
    : BatchDataLoader<Guid, Application?>
    , IApplicationByPartIdDataLoader
{
    private readonly IApplicationStore _applicationStore;

    public ApplicationByPartIdDataLoader(
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
        IEnumerable<Application>? parts =
            await _applicationStore.GetApplicationsByPartIdsAsync(keys, cancellationToken);

        return parts
            .SelectMany(application => application.Parts.Select(part => (part, application)))
            .ToLookup(x => x.part.Id, x => x.application)
            .ToDictionary(x => x.Key, x => x.FirstOrDefault());
    }
}
