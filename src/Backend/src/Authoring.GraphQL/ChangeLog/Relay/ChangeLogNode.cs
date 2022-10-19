using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL.Applications;

[Node]
[ExtendObjectType(typeof(ChangeLogNode))]
public sealed class ChangeLogNode
{
    [NodeResolver]
    public static Task<ChangeLog?> GetApplicationAsync(
        Guid id,
        [Service] IChangeLogService changeLogService,
        CancellationToken cancellationToken)
    {
        return changeLogService.GetById(id, cancellationToken);
    }
}
