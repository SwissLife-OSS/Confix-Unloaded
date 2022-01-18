using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Publishing;
using Confix.Authoring.Publishing.Stores;
using MongoDB.Driver;
using static MongoDB.Driver.Builders<Confix.Authoring.Publishing.PublishedApplicationPart>;
using Claimed = MongoDB.Driver.Builders<Confix.Authoring.Publishing.ClaimedVersion>;

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

        SortDefinition<PublishedApplicationPart> sort = Sort.Descending(x => x.PublishedAt);

        return await _dbContext.PublishedApplicationParts
            .Find(filter)
            .Sort(sort)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<PublishedApplicationPart?> GetPublishedPartByIdAsync(
        Guid publishedPartId,
        CancellationToken cancellationToken)
    {
        FilterDefinition<PublishedApplicationPart> filter = Filter.Eq(x => x.Id, publishedPartId);

        return await _dbContext.PublishedApplicationParts
            .Find(filter)
            .SingleOrDefaultAsync(cancellationToken);
    }

    public async Task<ClaimedVersion?> GetOrCreateClaimedVersionAsync(
        ClaimedVersion version,
        CancellationToken cancellationToken)
    {
        FilterDefinition<ClaimedVersion> filter =
            Claimed.Filter.Eq(x => x.ApplicationName, version.ApplicationName) &
            Claimed.Filter.Eq(x => x.ApplicationPartName, version.ApplicationPartName) &
            Claimed.Filter.Eq(x => x.EnvironmentName, version.EnvironmentName) &
            Claimed.Filter.Eq(x => x.GitVersion, version.GitVersion) &
            Claimed.Filter.Eq(x => x.PublishingId, version.PublishingId);

        UpdateDefinition<ClaimedVersion> update =
            Claimed.Update
                .SetOnInsert(x => x.ApplicationName, version.ApplicationName)
                .SetOnInsert(x => x.ApplicationPartName, version.ApplicationPartName)
                .SetOnInsert(x => x.EnvironmentName, version.EnvironmentName)
                .SetOnInsert(x => x.GitVersion, version.GitVersion)
                .SetOnInsert(x => x.PublishingId, version.PublishingId)
                .SetOnInsert(x => x.Configuration, version.Configuration)
                .SetOnInsert(x => x.ClaimedAt, version.ClaimedAt)
                .SetOnInsert(x => x.Id, version.Id);

        FindOneAndUpdateOptions<ClaimedVersion> options = new()
        {
            IsUpsert = true, ReturnDocument = ReturnDocument.After
        };

        return await _dbContext.ClaimedVersions
            .FindOneAndUpdateAsync(filter, update, options, cancellationToken);
    }

    public async Task<ClaimedVersion?> GetClaimedVersionByGitVersionAsync(
        string gitVersion,
        string applicationName,
        string applicationPartName,
        CancellationToken cancellationToken)
    {
        FilterDefinition<ClaimedVersion> filter =
            Claimed.Filter.Eq(x => x.ApplicationName, applicationName) &
            Claimed.Filter.Eq(x => x.ApplicationPartName, applicationPartName) &
            Claimed.Filter.Eq(x => x.GitVersion, gitVersion);

        SortDefinition<ClaimedVersion> sort =
            Claimed.Sort.Descending(x => x.ClaimedAt);

        return await _dbContext.ClaimedVersions
            .Find(filter)
            .Sort(sort)
            .FirstOrDefaultAsync(cancellationToken);
    }
}
