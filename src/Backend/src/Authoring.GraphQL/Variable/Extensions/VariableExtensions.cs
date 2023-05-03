using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(typeof(Variable))]
public sealed class VariableExtensions
{
    public async Task<IEnumerable<ChangeLog>> GetChangeLogAsync(
        [Service] IChangeLogService service,
        [Parent] Variable application,
        CancellationToken cancellationToken)
    {
        return await service.GetByVariableId(application.Id, cancellationToken);
    }
}
