using Confix.Authoring.Publishing;
using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(typeof(ApplicationPart))]
public sealed class ApplicationPartExtensions
{
    public async Task<IEnumerable<VariableValue>> GetVariableValuesAsync(
        [Service] IVariableService service,
        [Parent] ApplicationPart applicationPart,
        CancellationToken cancellationToken)
    {
        return await service.GetValuesAsync(
            null,
            new[] { new ApplicationPartVariableValueScope(null, applicationPart.Id) },
            cancellationToken);
    }

    public async Task<IEnumerable<ChangeLog>> GetChangeLogAsync(
        [Service] IChangeLogService service,
        [Parent] ApplicationPart applicationPart,
        CancellationToken cancellationToken)
    {
        return await service.GetByApplicationPartId(applicationPart.Id, cancellationToken);
    }

    [UsePaging]
    public async Task<IEnumerable<PublishedApplicationPart>> GetPublishedVersions(
        [Service] IPublishingService service,
        [Parent] ApplicationPart applicationPart,
        CancellationToken cancellationToken)
    {
        return await service.GetPublishedByPartId(applicationPart.Id, cancellationToken);
    }

    [UsePaging]
    public async Task<IEnumerable<DeployedEnvironment>> GetDeployments(
        [Service] IPublishingService service,
        [Parent] ApplicationPart applicationPart,
        CancellationToken cancellationToken)
    {
        var envs = await service
            .GetDeployedEnvironmentByPartIdAsync(applicationPart.Id, cancellationToken);

        return envs.Select(x => new DeployedEnvironment(applicationPart.Id, x.Id));
    }
}
