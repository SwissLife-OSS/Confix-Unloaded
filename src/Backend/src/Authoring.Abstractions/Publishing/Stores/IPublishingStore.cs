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

    Task<IReadOnlyList<PublishedApplicationPart>> GetPublishedApplicationPartByIdsAsync(
        IEnumerable<Guid> partIds,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<ClaimedVersion>> GetClaimedVersionAsync(
        Guid partId,
        Guid environmentId,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<ClaimedVersion>> GetClaimedVersionByPublishingIdAsync(
        Guid publishingId,
        CancellationToken cancellationToken);

    Task<PublishedApplicationPart?> GetMostRecentByApplicationPartIdAsync(
        Guid partId,
        CancellationToken cancellationToken);

    Task<PublishedApplicationPart?> GetPublishedPartByIdAsync(
        Guid publishedPartId,
        CancellationToken cancellationToken);

    Task<ClaimedVersion> GetOrCreateClaimedVersionAsync(
        ClaimedVersion claimedVersion,
        CancellationToken cancellationToken);

    Task<IEnumerable<Guid>> GetDeployedEnvironmentsByPartIdAsync(
        Guid partId,
        CancellationToken cancellationToken);

    Task<ClaimedVersion?> GetClaimedVersionByGitVersionAsync(
        string gitVersion,
        Guid applicationId,
        Guid applicationPartId,
        CancellationToken cancellationToken);

    Task<ClaimedVersion?> GetClaimedVersionAsync(
        Guid partId,
        Guid environmentId,
        string gitVersion,
        CancellationToken cancellationToken);
}
