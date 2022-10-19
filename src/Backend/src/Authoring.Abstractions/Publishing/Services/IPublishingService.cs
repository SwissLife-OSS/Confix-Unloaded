using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Confix.Authoring.Publishing;

public interface IPublishingService
{
    Task<PublishedApplicationPart> PublishPartByIdAsync(
        Guid partId,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<PublishedApplicationPart>> GetPublishedByPartId(
        Guid partId,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<ClaimedVersion>> GetClaimedVersionAsync(
        Guid partId,
        Guid environmentId,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<Environment>> GetDeployedEnvironmentByPartIdAsync(
        Guid partId,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<ClaimedVersion>> GetClaimedVersionByPublishedPartIdAsync(
        Guid publishedApplicationId,
        CancellationToken cancellationToken);

    Task<PublishedApplicationPart?> GetPublishedById(
        Guid id,
        CancellationToken cancellationToken);

    Task<ClaimedVersion> ClaimVersionAsync(
        string gitVersion,
        string applicationName,
        string applicationPartName,
        string environmentName,
        CancellationToken cancellationToken);
}
