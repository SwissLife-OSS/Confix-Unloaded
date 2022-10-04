using Confix.Authoring.Publishing.Stores;
using GreenDonut;

namespace Confix.Authoring.Publishing;

public class PublishedApplicationPartsByPartByIdPartDataloader
    : GroupedDataLoader<Guid, PublishedApplicationPart>
    , IPublishedApplicationPartsByPartIdDataloader
{
    private readonly IPublishingStore _publishingStore;

    public PublishedApplicationPartsByPartByIdPartDataloader(
        IPublishingStore publishingStore,
        IBatchScheduler batchScheduler,
        DataLoaderOptions? options = null) : base(batchScheduler, options)
    {
        _publishingStore = publishingStore;
    }

    protected override async Task<ILookup<Guid, PublishedApplicationPart>> LoadGroupedBatchAsync(
        IReadOnlyList<Guid> keys,
        CancellationToken cancellationToken)
    {
        var results = await _publishingStore.GetByApplicationPartIdsAsync(keys, cancellationToken);

        return results.OrderByDescending(x => x.PublishedAt).ToLookup(x => x.Part.Id);
    }
}
