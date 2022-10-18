using Confix.Authoring.Publishing.Stores;
using GreenDonut;

namespace Confix.Authoring.Publishing;

public class PublishedApplicationPartByByIdDataloader
    : BatchDataLoader<Guid, PublishedApplicationPart>
    , IPublishedApplicationPartByIdDataloader
{
    private readonly IPublishingStore _publishingStore;

    public PublishedApplicationPartByByIdDataloader(
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
