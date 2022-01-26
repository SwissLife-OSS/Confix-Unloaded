using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Publishing;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(typeof(PublishedApplicationPart))]
public class PublishedApplicationPartExtensions
{
    public Task<IReadOnlyList<ClaimedVersion>> GetClaimsVersions(
        [Service] IPublishingService service,
        [Parent] PublishedApplicationPart parent,
        CancellationToken cancellationToken) =>
        service.GetClaimedVersionByPublishedPartIdAsync(parent.Id, cancellationToken);
}
