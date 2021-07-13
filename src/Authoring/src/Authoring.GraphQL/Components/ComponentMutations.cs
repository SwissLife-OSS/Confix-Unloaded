using System.Threading;
using System.Threading.Tasks;
using HotChocolate.Types;

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

        [Error(typeof(ValueSchemaViolation))]
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

        public async Task<UpdateComponentSchemaPayload> UpdateComponentSchemaAsync(
            UpdateComponentSchemaInput input,
            CancellationToken cancellationToken)
        {
            Component component = await _componentService.SetSchemaAsync(
                input.Id,
                input.Schema,
                cancellationToken);

            return new UpdateComponentSchemaPayload(component);
        }

        [Error(typeof(ValueSchemaViolation))]
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
}
