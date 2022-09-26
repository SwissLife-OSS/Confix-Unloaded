using System;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(OperationTypeNames.Mutation)]
public class VariableMutations
{
    public async Task<Variable?> CreateVariableAsync(
        [Service] IVariableService variableService,
        string name,
        bool isSecret,
        string? @namespace,
        string? defaultValue,
        CancellationToken cancellationToken)
        => await variableService
            .CreateAsync(name, @namespace, isSecret, defaultValue, cancellationToken);

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
        => await variableService.SaveValueAsync(variableId,
            value,
            valueId,
            applicationId,
            partId,
            environmentId,
            cancellationToken);

    [UseMutationConvention(PayloadFieldName = "value")]
    public async Task<VariableValue> DeleteVariableValueAsync(
        [Service] IVariableService variableService,
        [ID(nameof(VariableValue))] Guid id,
        CancellationToken cancellationToken)
        => await variableService.DeleteValueAsync(id, cancellationToken);

    public async Task<Variable?> RenameVariableAsync(
        [Service] IVariableService variableService,
        [ID(nameof(Variable))] Guid id,
        string name,
        CancellationToken cancellationToken)
        => await variableService.RenameAsync(id, name, cancellationToken);
}
