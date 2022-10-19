using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Publishing;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL.Publishing;

[ExtendObjectType(typeof(ApplicationPart))]
public sealed class ApplicationPartPublishingExtensions
{
    [UsePaging]
    public async Task<IReadOnlyList<PublishedApplicationPart>> PublishApplicationPartByIdAsync(
        [Service] IPublishingService service,
        [Parent] ApplicationPart part,
        CancellationToken cancellationToken)
        => await service.GetPublishedByPartId(part.Id, cancellationToken);

}
