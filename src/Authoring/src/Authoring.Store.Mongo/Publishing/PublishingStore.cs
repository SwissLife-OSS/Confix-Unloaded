using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Publishing;
using Confix.Authoring.Publishing.Stores;
using MongoDB.Driver;
using static MongoDB.Driver.Builders<Confix.Authoring.Publishing.PublishedApplicationPart>;

namespace Confix.Authoring.Store.Mongo;

public class PublishingStore : IPublishingStore
{
    private readonly IConfixAuthorDbContext _dbContext;

    public PublishingStore(IConfixAuthorDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<PublishedApplicationPart> CreateAsync(
        PublishedApplicationPart part,
        CancellationToken cancellationToken)
    {
        await _dbContext.PublishedApplicationParts.InsertOneAsync(part, null, cancellationToken);

        return part;
    }

    public async Task<IReadOnlyList<PublishedApplicationPart>> GetByApplicationPartIdsAsync(
        IEnumerable<Guid> partIds,
        CancellationToken cancellationToken)
    {
        FilterDefinition<PublishedApplicationPart> filter = Filter.In(x => x.Part.Id, partIds);

        return await _dbContext.PublishedApplicationParts
            .Find(filter)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<PublishedApplicationPart>> GetByApplicationIdsAsync(
        IEnumerable<Guid> partIds,
        CancellationToken cancellationToken)
    {
        FilterDefinition<PublishedApplicationPart> filter = Filter.In(x => x.Id, partIds);

        return await _dbContext.PublishedApplicationParts
            .Find(filter)
            .ToListAsync(cancellationToken);
    }

    public async Task<PublishedApplicationPart?> GetMostRecentByApplicationPartIdAsync(
        Guid partId,
        CancellationToken cancellationToken)
    {
        FilterDefinition<PublishedApplicationPart> filter = Filter.Eq(x => x.Part.Id, partId);

        SortDefinition<PublishedApplicationPart> sort = Sort.Descending(x => x.Version);

        return await _dbContext.PublishedApplicationParts
            .Find(filter)
            .Sort(sort)
            .FirstOrDefaultAsync(cancellationToken);
    }
}
