using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL
{
    [ExtendObjectType(Name = "Mutation")]
    public class ComponentMutations
    {
        private readonly IComponentService _componentService;

        public ComponentMutations(IComponentService componentService)
        {
            _componentService = componentService;
        }

        [GraphQLName("Component_Add")]
        public async Task<UpdateComponentPayload> AddAsync(
            AddComponentRequest input,
            CancellationToken cancellationToken)
        {
            Component component = await _componentService.AddAsync(
                input,
                cancellationToken);

            return new UpdateComponentPayload(component);
        }

        [GraphQLName("Component_UpdateSchema")]
        public async Task<UpdateComponentPayload> UpdateSchemaAsync(
            UpdateComponentSchemaRequest input,
            CancellationToken cancellationToken)
        {
            Component component = await _componentService.UpdateSchemaAsync(
                input,
                cancellationToken);

            return new UpdateComponentPayload(component);
        }
    }

}
