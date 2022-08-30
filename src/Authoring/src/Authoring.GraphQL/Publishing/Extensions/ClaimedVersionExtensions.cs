using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Publishing;
using Confix.Authoring.Store;
using Confix.CryptoProviders;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(typeof(ClaimedVersion))]
public class ClaimedVersionExtensions
{
    [BindMember(nameof(ClaimedVersion.ApplicationId))]
    public async Task<Application?> GetApplicationAsync(
        [Service] IApplicationService service,
        [Parent] ClaimedVersion claimedVersion,
        CancellationToken cancellationToken)
        => await service.GetByIdAsync(claimedVersion.ApplicationId, cancellationToken);

    [BindMember(nameof(ClaimedVersion.ApplicationPartId))]
    public async Task<ApplicationPart?> GetApplicationPartAsync(
        [Service] IApplicationService service,
        [Parent] ClaimedVersion claimedVersion,
        CancellationToken cancellationToken)
        => await service.GetPartByIdAsync(claimedVersion.ApplicationPartId, cancellationToken);

    [BindMember(nameof(ClaimedVersion.EnvironmentId))]
    public async Task<Environment?> GetEnvironmentAsync(
        [Service] IEnvironmentService service,
        [Parent] ClaimedVersion claimedVersion,
        CancellationToken cancellationToken)
        => await service.GetByIdAsync(claimedVersion.EnvironmentId, cancellationToken);

    [BindMember(nameof(ClaimedVersion.PublishingId))]
    public async Task<PublishedApplicationPart?> GetPublishedApplicationPartAsync(
        [Service] IPublishingService service,
        [Parent] ClaimedVersion claimedVersion,
        CancellationToken cancellationToken)
        => await service.GetPublishedById(claimedVersion.PublishingId, cancellationToken);

    public async Task<string?> GetTokenAsync(
        [Service] IDecryptor service,
        [Parent] ClaimedVersion claimedVersion,
        CancellationToken cancellationToken)
        => await service.DecryptAsync(claimedVersion.Token, cancellationToken);
}
