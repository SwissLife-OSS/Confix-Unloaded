using System;
using System.Collections.Generic;
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

        public async Task<IEnumerable<Component>> GetManyAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken)
        {
            return await _componentStore.GetManyAsync(ids, cancellationToken);
        }

        public async Task<Component> AddAsync(
            AddComponentRequest request,
            CancellationToken cancellationToken)
        {
            var component = new Component
            {
                Id = Guid.NewGuid(),
                State = ComponentState.Active,
                Name = request.Name,
            };

            return await _componentStore.AddAsync(component, cancellationToken);
        }

        public async Task<Component> UpdateSchemaAsync(
            UpdateComponentSchemaRequest request,
            CancellationToken cancellationToken)
        {
            Component component = await _componentStore.GetByIdAsync(
                request.Id,
                cancellationToken);

            component.Schema = request.Schema;

            await _componentStore.UpdateAsync(component, cancellationToken);

            return component;
        }
    }
}
