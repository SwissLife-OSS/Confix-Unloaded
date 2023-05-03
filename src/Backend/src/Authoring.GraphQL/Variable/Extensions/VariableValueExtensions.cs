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
        return await variableService.GetByIdAsync(value.VariableId, cancellationToken);
    }

    public async Task<Application?> GetApplicationAsync(
        [Parent] VariableValue value,
        [Service] IApplicationService service,
        CancellationToken cancellationToken)
    {
        return value.Scope is ApplicationVariableValueScope { ApplicationId: var applicationId }
            ? await service.GetByIdAsync(applicationId, cancellationToken)
            : null;
    }

    public async Task<ApplicationPart?> GetApplicationPartAsync(
        [Parent] VariableValue value,
        [Service] IApplicationService service,
        CancellationToken cancellationToken)
    {
        return value.Scope is ApplicationPartVariableValueScope { PartId: var partId }
            ? await service.GetPartByIdAsync(partId, cancellationToken)
            : null;
    }

    public async Task<Environment?> GetEnvironmentAsync(
        [Parent] VariableValue value,
        [Service] IEnvironmentService service,
        CancellationToken cancellationToken)
    {
        return value.Scope.EnvironmentId is { } environmentId
            ? await service.GetByIdAsync(environmentId, cancellationToken)
            : null;
    }
}
