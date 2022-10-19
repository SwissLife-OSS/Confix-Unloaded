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

    public async Task<IEnumerable<VariableValue>> GetValuesAsync(
        [Service] IVariableService service,
        [Parent] Variable variable,
        CancellationToken cancellationToken)
    {
        return await service.GetValuesAsync(variable,
            new VariableValueFilter(variable.Id),
            false,
            cancellationToken);
    }
}
