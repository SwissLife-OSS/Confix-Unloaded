using Confix.Authoring.Publishing;
using Confix.Authoring.Store;
using Confix.Common.Exceptions;

namespace Confix.Authoring.GraphQL.Publishing;

[ExtendObjectType(OperationTypeNames.Mutation)]
public sealed class PublishingMutations
{
    [Error(typeof(PublishingException))]
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<PublishedApplicationPart> PublishApplicationPartByIdAsync(
        [Service] IPublishingService service,
        [ID(nameof(ApplicationPart))] Guid applicationPartId,
        CancellationToken cancellationToken)
    {
        return await service.PublishPartByIdAsync(applicationPartId, cancellationToken);
    }

    [Error(typeof(ClaimVersionFailedException))]
    [Error(typeof(UnauthorizedOperationException))]
    [UseMutationConvention(PayloadFieldName = "result")]
    public async Task<ClaimVersionResult> ClaimVersionAsync(
        [Service] IPublishingService service,
        string tag,
        string applicationName,
        string applicationPartName,
        string environmentName,
        CancellationToken cancellationToken)
    {
        return new ClaimVersionResult(await service.ClaimVersionAsync(
                tag,
                applicationName,
                applicationPartName,
                environmentName,
                cancellationToken)
            // TODO make nice remove
            ?? throw new ClaimVersionFailedException("Failed"));
    }
}
