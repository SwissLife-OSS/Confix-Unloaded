using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;

namespace Confix.Authoring
{
    public class ComponentService : IComponentService
    {
        private readonly IComponentStore _componentStore;

        public ComponentService(IComponentStore componentStore)
        {
            _componentStore = componentStore;
        }

        public async Task<IEnumerable<Component>> GetAllAsync(
            CancellationToken cancellationToken)
        {
            return await _componentStore.GetAllAsync(cancellationToken);
        }

        public async Task<Component> AddAsync(
            AddComponentRequest request,
            CancellationToken cancellationToken)
        {
            var component = new Component
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
            };

            return await _componentStore.AddAsync(component, cancellationToken);
        }
    }
}
