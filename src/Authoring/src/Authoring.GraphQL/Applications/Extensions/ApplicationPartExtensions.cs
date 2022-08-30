using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Publishing;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL;
[ExtendObjectType(typeof(ApplicationPart))]
public class ApplicationPartExtensions
{
    public async Task<IEnumerable<VariableValue>> GetVariableValuesAsync(
        [Service] IVariableService service,
        [Parent] ApplicationPart applicationPart,
        CancellationToken cancellationToken)
        => await service.GetValuesByApplicationPartAsync(applicationPart.Id, cancellationToken);

    public async Task<IEnumerable<ChangeLog>> GetChangeLogAsync(
        [Service] IChangeLogService service,
        [Parent] ApplicationPart applicationPart,
        CancellationToken cancellationToken)
        => await service.GetByApplicationPartId(applicationPart.Id, cancellationToken);

    [UsePaging]
    public async Task<IEnumerable<PublishedApplicationPart>> GetPublishedVersions(
        [Service] IPublishingService service,
        [Parent] ApplicationPart applicationPart,
        CancellationToken cancellationToken)
        => await service.GetPublishedByPartId(applicationPart.Id, cancellationToken);

    [UsePaging]
    public async Task<IEnumerable<DeployedEnvironment>> GetDeployments(
        [Service] IPublishingService service,
        [Parent] ApplicationPart applicationPart,
        CancellationToken cancellationToken)
    {
        IReadOnlyList<Environment> envs = await service
            .GetDeployedEnvironmentByPartIdAsync(applicationPart.Id, cancellationToken);

        return envs.Select(x => new DeployedEnvironment(applicationPart.Id, x.Id));
    }
}
