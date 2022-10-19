using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL.Applications;

[ExtendObjectType(OperationTypeNames.Query)]
public sealed class ChangeLogQueries
{
    public Task<ChangeLog?> GetChangeLogByIdAsync(
        [Service] IChangeLogService changeLogService,
        [ID(nameof(ChangeLog))] Guid id,
        CancellationToken cancellationToken)
    {
        return changeLogService.GetById(id, cancellationToken);
    }
}
