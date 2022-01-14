using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
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

    protected override async Task<IReadOnlyDictionary<Guid, PublishedApplicationPart>> LoadBatchAsync(IReadOnlyList<Guid> keys, CancellationToken cancellationToken)
    {
        IReadOnlyList<PublishedApplicationPart> results =
            await _publishingStore.GetByApplicationIdsAsync(keys, cancellationToken);

        return results.ToDictionary(x => x.Part.Id);
    }
}
