using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL
{
    [ExtendObjectType(Name = "Query")]
    public class ComponentQueries
    {
        private readonly IComponentService _componentService;

        public ComponentQueries(IComponentService componentService)
        {
            _componentService = componentService;
        }

        public async Task<IEnumerable<Component>> GetComponentsAsync(
            CancellationToken cancellationToken)
        {
            return await _componentService.GetAllAsync(cancellationToken);
        }
    }
}
