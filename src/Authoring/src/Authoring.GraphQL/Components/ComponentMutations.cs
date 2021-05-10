using System;
using System.Threading;
using System.Threading.Tasks;
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

        public async Task<CreateComponentPayload> CreateComponentAsync(
            CreateComponentInput input,
            CancellationToken cancellationToken)
        {
            Authoring.Component component = await _componentService.CreateAsync(
                input.Name,
                input.Schema,
                cancellationToken);

            return new CreateComponentPayload(component);
        }

        public async Task<UpdateComponentPayload> UpdateComponentSchemaAsync(
            UpdateComponentSchemaInput input,
            CancellationToken cancellationToken)
        {
            Authoring.Component component = await _componentService.UpdateSchemaAsync(
                input.Id,
                input.Schema,
                cancellationToken);

            return new UpdateComponentPayload(component);
        }
    }

    public record CreateComponentInput(
        string Name,
        [DefaultValue("type Component { text: String! }")] string Schema);

    public class CreateComponentPayload
    {
        public CreateComponentPayload(Authoring.Component component)
        {
            Component = component;
        }

        public Authoring.Component Component { get; }
    }

    public record UpdateComponentSchemaInput(
        [ID(nameof(Authoring.Component))] Guid Id,
        string Schema);

    public class UpdateComponentSchemaPayload
    {
        public UpdateComponentSchemaPayload(Authoring.Component component)
        {
            Component = component;
        }

        public Authoring.Component Component { get; }
    }
}
