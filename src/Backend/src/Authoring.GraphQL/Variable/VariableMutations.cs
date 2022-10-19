using Confix.Authoring.Store;
using Confix.Common.Exceptions;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(OperationTypeNames.Mutation)]
public sealed class VariableMutations
{
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Variable?> CreateVariableAsync(
        [Service] IVariableService variableService,
        string name,
        bool isSecret,
        string? @namespace,
        string? defaultValue,
        CancellationToken cancellationToken)
    {
        return await variableService.CreateAsync(
            name,
            @namespace,
            isSecret,
            defaultValue,
            cancellationToken);
    }

    [Error(typeof(UnauthorizedOperationException))]
    [UseMutationConvention(PayloadFieldName = "value")]
    public async Task<VariableValue> SaveVariableValueAsync(
        [Service] IVariableService variableService,
        [ID(nameof(Variable))] Guid variableId,
        string value,
        [ID(nameof(VariableValue))] Guid? valueId,
        [ID(nameof(Application))] Guid? applicationId,
        [ID(nameof(ApplicationPart))] Guid? partId,
        [ID(nameof(Environment))] Guid? environmentId,
        CancellationToken cancellationToken)
    {
        return await variableService.SaveValueAsync(
            variableId,
            value,
            valueId,
            applicationId,
            partId,
            environmentId,
            cancellationToken);
    }

    [Error(typeof(UnauthorizedOperationException))]
    [UseMutationConvention(PayloadFieldName = "value")]
    public async Task<VariableValue> DeleteVariableValueAsync(
        [Service] IVariableService variableService,
        [ID(nameof(VariableValue))] Guid id,
        CancellationToken cancellationToken)
    {
        return await variableService.DeleteValueAsync(id, cancellationToken);
    }

    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Variable?> RenameVariableAsync(
        [Service] IVariableService variableService,
        [ID(nameof(Variable))] Guid id,
        string name,
        CancellationToken cancellationToken)
    {
        return await variableService.RenameAsync(id, name, cancellationToken);
    }
}
