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

    Task<PublishedApplicationPart?> GetPublishedById(
        Guid id,
        CancellationToken cancellationToken);
}
