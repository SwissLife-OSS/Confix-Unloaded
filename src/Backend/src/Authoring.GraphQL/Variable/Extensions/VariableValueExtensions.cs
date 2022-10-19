using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(typeof(VariableValue))]
public sealed class VariableValueExtensions
{
    public async Task<Variable?> GetVariableAsync(
        [Service] IVariableService variableService,
        [Parent] VariableValue value,
        CancellationToken cancellationToken)
    {
        return await variableService.GetByIdAsync(value.Key.VariableId, cancellationToken);
    }

    public async Task<Application?> GetApplicationAsync(
        [Parent] VariableValue value,
        [Service] IApplicationService service,
        CancellationToken cancellationToken)
    {
        return value.Key.ApplicationId is { } applicationId
            ? await service.GetByIdAsync(applicationId, cancellationToken)
            : null;
    }

    public async Task<ApplicationPart?> GetApplicationPartAsync(
        [Parent] VariableValue value,
        [Service] IApplicationService service,
        CancellationToken cancellationToken)
    {
        return value.Key.PartId is { } partId
            ? await service.GetPartByIdAsync(partId, cancellationToken)
            : null;
    }

    public async Task<Environment?> GetEnvironmentAsync(
        [Parent] VariableValue value,
        [Service] IEnvironmentService service,
        CancellationToken cancellationToken)
    {
        return value.Key.EnvironmentId is { } environmentId
            ? await service.GetByIdAsync(environmentId, cancellationToken)
            : null;
    }
}
