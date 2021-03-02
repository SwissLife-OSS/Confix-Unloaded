using System;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL
{
    [ExtendObjectType(Name = "Mutation")]
    public class VariableMutations
    {
        private readonly IVariableService _variableService;

        public VariableMutations(IVariableService variableService)
        {
            _variableService = variableService;
        }

        public async Task<UpdateVariablePayload> CreateVariableAsync(
            CreateVariableInput input,
            CancellationToken cancellationToken)
        {
            Variable variable = await _variableService.CreateAsync(
                new CreateVariableRequest(input.Name, input.IsSecret)
                {
                    DefaultValue = input.DefaultValue,
                    Namespace = input.Namespace
                },
                cancellationToken);

            return new UpdateVariablePayload(variable);
        }

        public async Task<UpdateVariableValuePayload> SaveVariableValueAsync(
            SaveVariableValueInput input,
            CancellationToken cancellationToken)
        {
            VariableValue value = await _variableService.SaveValueAsync(
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
            DeleteVariableValueInput input,
            CancellationToken cancellationToken)
        {
            Variable variable = await _variableService.DeleteValueAsync(input.id, cancellationToken);

            return new DeleteVariableValuePayload(input.id, variable);
        }
    }

    public record CreateVariableInput(string Name, bool IsSecret)
    {
        public string? Namespace { get; init; }

        public string? DefaultValue { get; set; }
    }

    public record DeleteVariableValueInput([ID(nameof(VariableValue))] Guid id);

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
