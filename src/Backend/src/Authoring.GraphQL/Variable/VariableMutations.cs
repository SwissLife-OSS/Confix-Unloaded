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
        string @namespace,
        string? defaultValue,
        VariableValueScope scope,
        CancellationToken cancellationToken)
    {
        return await variableService
            .CreateAsync(name, @namespace, isSecret, scope, defaultValue, cancellationToken);
    }

    [Error(typeof(UnauthorizedOperationException))]
    [UseMutationConvention(PayloadFieldName = "value")]
    public async Task<VariableValue> SaveVariableValueAsync(
        [Service] IVariableService variableService,
        [ID<Variable>] Guid variableId,
        VariableValueScopeInput reference,
        string value,
        CancellationToken cancellationToken)
    {
        return await variableService
            .SaveValueAsync(variableId, value, reference.GetValueScope(), cancellationToken);
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
