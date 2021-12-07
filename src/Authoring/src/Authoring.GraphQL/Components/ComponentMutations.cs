using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL.Components
{
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class ComponentMutations
    {
        [Error(typeof(ValueSchemaViolation))]
        public async Task<CreateComponentPayload> CreateComponentAsync(
            [Service] IComponentService service,
            CreateComponentInput input,
            CancellationToken cancellationToken)
        {
            Component component = await service.CreateAsync(
                input.Name,
                input.Schema,
                input.Values,
                cancellationToken);

            return new CreateComponentPayload(component);
        }

        public async Task<RenameComponentPayload> RenameComponentAsync(
            [Service] IComponentService service,
            RenameComponentInput input,
            CancellationToken cancellationToken)
        {
            Component component = await service.RenameAsync(
                input.Id,
                input.Name,
                cancellationToken);

            return new RenameComponentPayload(component);
        }

        public async Task<UpdateComponentSchemaPayload> UpdateComponentSchemaAsync(
            [Service] IComponentService service,
            UpdateComponentSchemaInput input,
            CancellationToken cancellationToken)
        {
            Component component = await service.SetSchemaAsync(
                input.Id,
                input.Schema,
                cancellationToken);

            return new UpdateComponentSchemaPayload(component);
        }

        [Error(typeof(ValueSchemaViolation))]
        public async Task<UpdateComponentValuesPayload> UpdateComponentValuesAsync(
            [Service] IComponentService service,
            UpdateComponentValuesInput input,
            CancellationToken cancellationToken)
        {
            Component component = await service.SetValuesAsync(
                input.Id,
                input.Values,
                cancellationToken);

            return new UpdateComponentValuesPayload(component);
        }
    }
}
