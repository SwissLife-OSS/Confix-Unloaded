using System;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Publishing;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Publishing;

[Node]
[ExtendObjectType(typeof(PublishedApplicationPart))]
public sealed class PublishedApplicationPartNode
{
    [NodeResolver]
    public static async Task<PublishedApplicationPart?> GetApplicationAsync(
        Guid id,
        IPublishingService publishingService,
        CancellationToken cancellationToken) =>
        await publishingService.GetPublishedById(id, cancellationToken);
}
