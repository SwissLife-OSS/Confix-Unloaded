using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(OperationTypeNames.Query)]
public class EnvironmentQueries
{
    [UsePaging]
    public Task<IQueryable<Environment>> SearchEnvironments(
        [Service] IEnvironmentService environmentService,
        string? search,
        CancellationToken cancellationToken)
    {
        return environmentService.SearchAsync(search, cancellationToken);
    }

    public async Task<Environment?> GetEnvironmentByIdAsync(
        [Service] IEnvironmentService environmentService,
        [ID(nameof(Environment))] Guid id,
        CancellationToken cancellationToken)
    {
        return await environmentService.GetByIdAsync(id, cancellationToken);
    }
}
