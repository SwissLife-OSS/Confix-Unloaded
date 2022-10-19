using Confix.Authoring.Publishing;
using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL.Publishing;

[ExtendObjectType(typeof(ApplicationPart))]
public sealed class ApplicationPartPublishingExtensions
{
    [UsePaging]
    public async Task<IReadOnlyList<PublishedApplicationPart>> PublishApplicationPartByIdAsync(
        [Service] IPublishingService service,
        [Parent] ApplicationPart part,
        CancellationToken cancellationToken)
    {
        return await service.GetPublishedByPartId(part.Id, cancellationToken);
    }
}
