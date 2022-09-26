using Confix.Authoring.Publishing.Stores;
using GreenDonut;

namespace Confix.Authoring.Publishing;

public class PublishedApplicationPartByIdDataloader
    : BatchDataLoader<Guid, PublishedApplicationPart>
{
    private readonly IPublishingStore _publishingStore;

    public PublishedApplicationPartByIdDataloader(
        IPublishingStore publishingStore,
        IBatchScheduler batchScheduler,
        DataLoaderOptions? options = null) : base(batchScheduler, options)
    {
        _publishingStore = publishingStore;
    }

    protected override async Task<IReadOnlyDictionary<Guid, PublishedApplicationPart>>
        LoadBatchAsync(IReadOnlyList<Guid> keys, CancellationToken cancellationToken)
    {
        var results =
            await _publishingStore.GetPublishedApplicationPartByIdsAsync(keys, cancellationToken);

        return results.ToDictionary(x => x.Id);
    }
}
