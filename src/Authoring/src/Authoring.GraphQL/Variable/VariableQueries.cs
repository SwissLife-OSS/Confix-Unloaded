using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(OperationTypeNames.Query)]
public sealed class VariableQueries
{
    public async Task<IEnumerable<Variable>> GetVariablesAsync(
        [Service] IVariableService variableService,
        CancellationToken cancellationToken)
        => await variableService.GetAllAsync(cancellationToken);

    [UsePaging]
    public Task<IQueryable<Variable>> SearchVariables(
        [Service] IVariableService variableService,
        string? search,
        CancellationToken cancellationToken)
        => variableService.SearchVariables(search, cancellationToken);

    public async Task<Variable?> GetVariableAsync(
        [Service] IVariableService variableService,
        [ID(nameof(Variable))] Guid id,
        CancellationToken cancellationToken)
        => await variableService.GetByIdAsync(id, cancellationToken);

    public async Task<IEnumerable<VariableValue>> GetVariableValuesAsync(
        [Service] IVariableService variableService,
        [ID(nameof(Variable))] Guid variableId,
        [ID(nameof(Application))] Optional<Guid?> applicationId,
        [ID(nameof(ApplicationPart))] Optional<Guid?> applicationPartId,
        CancellationToken cancellationToken)
    {
        VariableValueFilter filter = new(variableId)
        {
            ApplicationId = applicationId, PartId = applicationPartId
        };
        return await variableService.GetValuesAsync(filter, false, cancellationToken);
    }

    public async Task<IEnumerable<VariableValue>> GetGlobalVariableValuesAsync(
        [Service] IVariableService service,
        CancellationToken cancellationToken)
        => await service.GetGlobalValues(cancellationToken);
}
