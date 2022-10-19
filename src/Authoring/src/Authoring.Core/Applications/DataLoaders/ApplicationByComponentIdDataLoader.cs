using Confix.Authoring.Store;
using GreenDonut;

namespace Confix.Authoring.DataLoaders;

internal sealed class ApplicationByComponentIdDataLoader
    : BatchDataLoader<Guid, Application?>
    , IApplicationByComponentIdDataLoader
{
    private readonly IApplicationStore _applicationStore;

    public ApplicationByComponentIdDataLoader(
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
            await _applicationStore.GetApplicationsByComponentIdAsync(keys, cancellationToken);

        return parts
            .SelectMany(
                application => application.Parts.SelectMany(
                    part => part.Components.Select(component => (component, application))))
            .ToLookup(x => x.component.Id, x => x.application)
            .ToDictionary(x => x.Key, x => x.FirstOrDefault());
    }
}
