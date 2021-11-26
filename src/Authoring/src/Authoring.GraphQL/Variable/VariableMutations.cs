using System;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL
{
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class VariableMutations
    {
        public async Task<UpdateVariablePayload> CreateVariableAsync(
            [Service] IVariableService variableService,
            CreateVariableInput input,
            CancellationToken cancellationToken)
        {
            Variable variable = await variableService.CreateAsync(
                new CreateVariableRequest(input.Name, input.IsSecret)
                {
                    DefaultValue = input.DefaultValue, Namespace = input.Namespace
                },
                cancellationToken);

            return new UpdateVariablePayload(variable);
        }

        public async Task<UpdateVariableValuePayload> SaveVariableValueAsync(
            [Service] IVariableService variableService,
            SaveVariableValueInput input,
            CancellationToken cancellationToken)
        {
            VariableValue value = await variableService.SaveValueAsync(
                new SaveVariableValueRequest(input.VariableId, input.Value)
                {
                    ApplicationId = input.ApplicationId,
                    PartId = input.PartId,
                    ValueId = input.ValueId,
                    EnvironmentId = input.EnvironmentId
                },
                cancellationToken);

            return new UpdateVariableValuePayload(value);
        }

        public async Task<DeleteVariableValuePayload> DeleteVariableValueAsync(
            [Service] IVariableService variableService,
            DeleteVariableValueInput input,
            CancellationToken cancellationToken)
        {
            Variable variable =
                await variableService.DeleteValueAsync(input.id, cancellationToken);

            return new DeleteVariableValuePayload(input.id, variable);
        }

        public async Task<RenameVariablePayload> RenameVariableAsync(
            [Service] IVariableService variableService,
            RenameVariableInput input,
            CancellationToken cancellationToken)
        {
            Variable variable =
                await variableService.RenameAsync(input.Id, input.Name, cancellationToken);

            return new RenameVariablePayload(variable);
        }
    }

    public record CreateVariableInput(string Name, bool IsSecret)
    {
        public string? Namespace { get; init; }

        public string? DefaultValue { get; set; }
    }

    public record DeleteVariableValueInput([property: ID(nameof(VariableValue))] Guid id);

    public record SaveVariableValueInput(
        [ID(nameof(Variable))] Guid VariableId,
        string Value)
    {
        [ID(nameof(VariableValue))]
        public Guid? ValueId { get; init; }

        [ID(nameof(Application))]
        public Guid? ApplicationId { get; init; }

        [ID(nameof(ApplicationPart))]
        public Guid? PartId { get; init; }

        //[ID(nameof(Environment))]
        public Guid? EnvironmentId { get; init; }
    }
}
