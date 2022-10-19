using Confix.Authoring.Publishing;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(typeof(PublishedApplicationPart))]
public sealed class PublishedApplicationPartExtensions
{
    public Task<IReadOnlyList<ClaimedVersion>> GetClaimsVersions(
        [Service] IPublishingService service,
        [Parent] PublishedApplicationPart parent,
        CancellationToken cancellationToken)
    {
        return service.GetClaimedVersionByPublishedPartIdAsync(parent.Id, cancellationToken);
    }
}
