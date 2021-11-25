using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(OperationTypeNames.Query)]
public class EnvironmentQueries
{
    private readonly IEnvironmentService _envService;

    public EnvironmentQueries(IEnvironmentService envService)
    {
        _envService = envService;
    }

    [UsePaging]
    public IQueryable<Environment> SearchEnvironmentsAsync(
        string? search,
        CancellationToken cancellationToken)
    {
        return _envService.SearchAsync(search, cancellationToken);
    }

    public async Task<Environment?> GetEnvironmentByIdAsync(
        [ID(nameof(Environment))] Guid id,
        CancellationToken cancellationToken)
    {
        return await _envService.GetByIdAsync(id, cancellationToken);
    }
}
