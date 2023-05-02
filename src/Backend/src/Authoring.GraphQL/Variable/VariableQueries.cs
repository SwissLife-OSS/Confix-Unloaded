using Confix.Authentication.Authorization;
using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(OperationTypeNames.Query)]
public sealed class VariableQueries
{
    [UsePaging]
    public Task<IQueryable<Variable>> SearchVariables(
        [Service] IVariableService variableService,
        string? search,
        CancellationToken cancellationToken)
    {
        return variableService.SearchVariables(search, cancellationToken);
    }

    public async Task<Variable?> GetVariableAsync(
        [Service] IVariableService variableService,
        [ID(nameof(Variable))] Guid id,
        CancellationToken cancellationToken)
    {
        return await variableService.GetByIdAsync(id, cancellationToken);
    }

    public async Task<IEnumerable<VariableValue>> GetVariableValuesAsync(
        [Service] IVariableService variableService,
        [ID(nameof(Variable))] Guid variableId,
        VariableValueScopeInput scope,
        CancellationToken cancellationToken)
    {
        return await variableService.GetValuesAsync(
            new[] { variableId },
            new[] { scope.GetValueScope() },
            cancellationToken);
    }

    public async Task<IEnumerable<VariableValue>> GetGlobalVariableValuesAsync(
        [Service] IVariableService service,
        CancellationToken cancellationToken)
    {
        return await service.GetValuesAsync(null, null, cancellationToken);
    }
}
