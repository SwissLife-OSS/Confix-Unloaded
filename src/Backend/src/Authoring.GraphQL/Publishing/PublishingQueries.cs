using Confix.Authoring.Publishing;
using HotChocolate.Language;

namespace Confix.Authoring.GraphQL.Publishing;

[ExtendObjectType(OperationType.Query)]
public sealed class PublishingQueries
{
    /// <summary>
    /// Gets the latest published version of an application part.
    /// </summary>
    /// <param name="service"></param>
    /// <param name="applicationName"></param>
    /// <param name="applicationPartName"></param>
    /// <param name="environmentName"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [GraphQLType<LatestPublishedVersionResultType>]
    public async Task<object?> GetLatestPublishedVersionAsync(
        [Service] IPublishingService service,
        string applicationName,
        string applicationPartName,
        string environmentName,
        CancellationToken cancellationToken)
    {
        try
        {
            var result = await service.BuildLatestPublishedVersion(
                applicationName,
                applicationPartName,
                environmentName,
                cancellationToken);

            return new LatestPublishedVersion(result);
        }
        catch (ClaimVersionFailedException e)
        {
            return e;
        }
    }
}
