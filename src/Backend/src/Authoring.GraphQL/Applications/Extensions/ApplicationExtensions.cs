using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(typeof(Application))]
public sealed class ApplicationExtensions
{
    public async Task<IEnumerable<VariableValue>> GetVariableValuesAsync(
        [Service] IVariableService service,
        [Parent] Application application,
        CancellationToken cancellationToken)
    {
        return await service.GetValuesAsync(
            null,
            new[] { new ApplicationVariableValueScope(null, application.Id) },
            cancellationToken);
    }

    public async Task<IEnumerable<ChangeLog>> GetChangeLogAsync(
        [Service] IChangeLogService service,
        [Parent] Application application,
        CancellationToken cancellationToken)
    {
        return await service.GetByApplicationId(application.Id, cancellationToken);
    }
}
