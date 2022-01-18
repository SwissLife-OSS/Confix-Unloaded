using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace Confix.Authoring.Publishing.Stores;

public interface IPublishingStore
{
    Task<PublishedApplicationPart> CreateAsync(
        PublishedApplicationPart part,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<PublishedApplicationPart>> GetByApplicationPartIdsAsync(
        IEnumerable<Guid> partIds,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<PublishedApplicationPart>> GetByApplicationIdsAsync(
        IEnumerable<Guid> partIds,
        CancellationToken cancellationToken);

    Task<PublishedApplicationPart?> GetMostRecentByApplicationPartIdAsync(
        Guid partId,
        CancellationToken cancellationToken);

    Task<PublishedApplicationPart?> GetPublishedPartByIdAsync(
        Guid publishedPartId,
        CancellationToken cancellationToken);

    Task<ClaimedVersion?> GetOrCreateClaimedVersionAsync(
        ClaimedVersion claimedVersion,
        CancellationToken cancellationToken);

    Task<ClaimedVersion?> GetClaimedVersionByGitVersionAsync(
        string gitVersion,
        string applicationName,
        string applicationPartName,
        CancellationToken cancellationToken);
}
