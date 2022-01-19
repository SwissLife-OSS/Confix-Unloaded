using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Publishing.Stores;
using GreenDonut;

namespace Confix.Authoring.Publishing;

public class PublishedApplicationPartByIdPartDataloader
    : GroupedDataLoader<Guid, PublishedApplicationPart>, IPublishedApplicationPartByPartIdDataloader
{
    private readonly IPublishingStore _publishingStore;

    public PublishedApplicationPartByIdPartDataloader(
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
        IReadOnlyList<PublishedApplicationPart> results =
            await _publishingStore.GetByApplicationPartIdsAsync(keys, cancellationToken);

        return results.OrderByDescending(x => x.PublishedAt).ToLookup(x => x.Part.Id);
    }
}
