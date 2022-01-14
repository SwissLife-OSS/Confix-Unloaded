using System;
using System.Collections.Generic;
using System.Linq;
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
}
