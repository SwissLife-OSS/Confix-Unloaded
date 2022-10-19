using Confix.Authoring.Publishing;

namespace Confix.Authoring.GraphQL;

public sealed class DeployedEnvironment
{
    private readonly Guid _applicationPartId;
    private readonly Guid _environmentId;

    public DeployedEnvironment(Guid applicationPartId, Guid environmentId)
    {
        _applicationPartId = applicationPartId;
        _environmentId = environmentId;
    }

    public async Task<Environment?> GetEnvironmentAsync(
        [Service] IEnvironmentService service,
        CancellationToken cancellationToken)
    {
        return await service.GetByIdAsync(_environmentId, cancellationToken);
    }

    [UsePaging]
    public async Task<IReadOnlyList<ClaimedVersion>?> GetClaimedVersions(
        [Service] IPublishingService service,
        CancellationToken cancellationToken)
    {
        return await service
            .GetClaimedVersionAsync(_applicationPartId, _environmentId, cancellationToken);
    }
}
