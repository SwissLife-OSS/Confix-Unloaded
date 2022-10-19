using Confix.Authoring.Publishing;

namespace Confix.Authoring.GraphQL.Publishing;

[Node]
[ExtendObjectType(typeof(PublishedApplicationPart))]
public sealed class PublishedApplicationPartNode
{
    [NodeResolver]
    public static async Task<PublishedApplicationPart?> GetApplicationAsync(
        Guid id,
        IPublishingService publishingService,
        CancellationToken cancellationToken)
    {
        return await publishingService.GetPublishedById(id, cancellationToken);
    }
}
