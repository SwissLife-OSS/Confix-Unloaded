using System;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Publishing;
using Confix.Authoring.Publishing.Stores;
using Confix.Authoring.Store;
using Confix.Common.Exceptions;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Publishing;

[ExtendObjectType(OperationTypeNames.Mutation)]
public class PublishingMutations
{
    [Error(typeof(PublishingException))]
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<PublishedApplicationPart> PublishApplicationPartByIdAsync(
        [Service] IPublishingService service,
        [ID(nameof(ApplicationPart))] Guid applicationPartId,
        CancellationToken cancellationToken)
        => await service.PublishPartByIdAsync(applicationPartId, cancellationToken);

    [Error(typeof(ClaimVersionFailedException))]
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<ClaimedVersion> ClaimVersionAsync(
        [Service] IPublishingService service,
        string gitVersion,
        string applicationName,
        string applicationPartName,
        string environmentName,
        CancellationToken cancellationToken)
        => await service.ClaimVersionAsync(gitVersion,
                applicationName,
                applicationPartName,
                environmentName,
                cancellationToken)
            // TODO make nice remove
            ?? throw new ClaimVersionFailedException("Failed");
}
