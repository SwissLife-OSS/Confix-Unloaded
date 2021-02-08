using System.Threading;
using System.Threading.Tasks;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL
{
    [ExtendObjectType(RootTypes.Mutation)]
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
            Component component = await _componentService.AddAsync(
                new AddComponentRequest(input.Name),
                cancellationToken);

            return new CreateComponentPayload(component);
        }

        public async Task<UpdateComponentPayload> UpdateComponentSchemaAsync(
            UpdateComponentSchemaRequest input,
            CancellationToken cancellationToken)
        {
            Component component = await _componentService.UpdateSchemaAsync(
                input,
                cancellationToken);

            return new UpdateComponentPayload(component);
        }
    }

    public record CreateComponentInput(
        string Name,
        string Schema = "type ComponentRoot { text: String! }");

    public class CreateComponentPayload
    {
        public CreateComponentPayload(Component component)
        {
            Component = component;
        }

        public Component Component { get; }
    }
}
