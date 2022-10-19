using System;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Applications;

[ExtendObjectType(OperationTypeNames.Query)]
public sealed class ChangeLogQueries
{
    public Task<ChangeLog?> GetChangeLogByIdAsync(
        [Service] IChangeLogService changeLogService,
        [ID(nameof(ChangeLog))] Guid id,
        CancellationToken cancellationToken) =>
        changeLogService.GetById(id, cancellationToken);
}
