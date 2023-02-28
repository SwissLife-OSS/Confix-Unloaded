using Confix.Authoring.Publishing;
using Confix.Authoring.Store;
using Confix.CryptoProviders;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(typeof(ClaimedVersion))]
public sealed class ClaimedVersionExtensions
{
    [BindMember(nameof(ClaimedVersion.ApplicationId))]
    public async Task<Application?> GetApplicationAsync(
        [Service] IApplicationService service,
        [Parent] ClaimedVersion claimedVersion,
        CancellationToken cancellationToken)
    {
        return await service.GetByIdAsync(claimedVersion.ApplicationId, cancellationToken);
    }

    [BindMember(nameof(ClaimedVersion.ApplicationPartId))]
    public async Task<ApplicationPart?> GetApplicationPartAsync(
        [Service] IApplicationService service,
        [Parent] ClaimedVersion claimedVersion,
        CancellationToken cancellationToken)
    {
        return await service.GetPartByIdAsync(claimedVersion.ApplicationPartId, cancellationToken);
    }

    [BindMember(nameof(ClaimedVersion.EnvironmentId))]
    public async Task<Environment?> GetEnvironmentAsync(
        [Service] IEnvironmentService service,
        [Parent] ClaimedVersion claimedVersion,
        CancellationToken cancellationToken)
    {
        return await service.GetByIdAsync(claimedVersion.EnvironmentId, cancellationToken);
    }

    [BindMember(nameof(ClaimedVersion.PublishingId))]
    public async Task<PublishedApplicationPart?> GetPublishedApplicationPartAsync(
        [Service] IPublishingService service,
        [Parent] ClaimedVersion claimedVersion,
        CancellationToken cancellationToken)
    {
        return await service.GetPublishedById(claimedVersion.PublishingId, cancellationToken);
    }
}
