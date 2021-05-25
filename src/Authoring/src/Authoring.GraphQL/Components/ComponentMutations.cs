using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Components
{
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class ComponentMutations
    {
        private readonly IComponentService _componentService;

        public ComponentMutations(IComponentService componentService)
        {
            _componentService = componentService;
        }

        [Error(typeof(ComponentFieldRequired))]
        public async Task<CreateComponentPayload> CreateComponentAsync(
            CreateComponentInput input,
            CancellationToken cancellationToken)
        {
            Component component = await _componentService.CreateAsync(
                input.Name,
                input.Schema,
                input.Values,
                cancellationToken);

            return new CreateComponentPayload(component);
        }

        [Error(typeof(ComponentFieldRequired))]
        public async Task<RenameComponentPayload> RenameComponentAsync(
            RenameComponentInput input,
            CancellationToken cancellationToken)
        {
            Component component = await _componentService.RenameAsync(
                input.Id,
                input.Name,
                cancellationToken);

            return new RenameComponentPayload(component);
        }

        [Error(typeof(ComponentFieldRequired))]
        public async Task<UpdateComponentSchemaPayload> UpdateComponentSchemaAsync(
            UpdateComponentSchemaInput input,
            CancellationToken cancellationToken)
        {
            Component component = await _componentService.SetSchemaAsync(
                input.Id,
                input.Schema,
                input.Values,
                cancellationToken);

            return new UpdateComponentSchemaPayload(component);
        }

        [Error(typeof(ComponentFieldRequired))]
        public async Task<UpdateComponentValuesPayload> UpdateComponentValuesAsync(
            UpdateComponentValuesInput input,
            CancellationToken cancellationToken)
        {
            Component component = await _componentService.SetValuesAsync(
                input.Id,
                input.Values,
                cancellationToken);

            return new UpdateComponentValuesPayload(component);

        }
    }

    public record CreateComponentInput(
        string Name,
        [DefaultValue("type Component { text: String! }")]
        string Schema,
        [GraphQLType(typeof(AnyType))] Dictionary<string, object?>? Values);


    public class CreateComponentPayload
    {
        public CreateComponentPayload(Component component)
        {
            Component = component;
        }

        public Component Component { get; }
    }

    public record RenameComponentInput(
        [ID(nameof(Component))] Guid Id,
        string Name);

    public record UpdateComponentSchemaInput(
        [ID(nameof(Component))] Guid Id,
        string Schema,
        [GraphQLType(typeof(AnyType))] Dictionary<string, object?>? Values);

    public record UpdateComponentValuesInput(
        [ID(nameof(Component))] Guid Id,
        [GraphQLType(typeof(AnyType))] Dictionary<string, object?> Values);

    public class UpdateComponentSchemaPayload
    {
        public UpdateComponentSchemaPayload(Component component)
        {
            Component = component;
        }

        public Component Component { get; }
    }

    public class UpdateComponentValuesPayload
    {
        public UpdateComponentValuesPayload(Component component)
        {
            Component = component;
        }

        public Component Component { get; }
    }

    public class RenameComponentPayload
    {
        public RenameComponentPayload(Component component)
        {
            Component = component;
        }

        public Component Component { get; }
    }
}
