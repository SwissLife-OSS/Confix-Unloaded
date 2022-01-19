using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Publishing;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL;

public class DeployedEnvironment
{
    private readonly Guid _environmentId;
    private readonly Guid _applicationPartId;

    public DeployedEnvironment(Guid applicationPartId, Guid environmentId)
    {
        _applicationPartId = applicationPartId;
        _environmentId = environmentId;
    }

    public async Task<Environment?> GetEnvironmentAsync(
        [Service] IEnvironmentService service,
        CancellationToken cancellationToken)
        => await service.GetByIdAsync(_environmentId, cancellationToken);

    [UsePaging]
    public async Task<IReadOnlyList<ClaimedVersion>?> GetClaimedVersions(
        [Service] IPublishingService service,
        CancellationToken cancellationToken)
        => await service
            .GetClaimedVersionAsync(_applicationPartId, _environmentId, cancellationToken);
}
