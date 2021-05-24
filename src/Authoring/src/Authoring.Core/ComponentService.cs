using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate;

namespace Confix.Authoring
{
    public class ComponentService : IComponentService
    {
        private readonly IComponentStore _componentStore;

        public ComponentService(IComponentStore componentStore)
        {
            _componentStore = componentStore;
        }

        public async Task<Component?> GetByIdAsync(
            Guid id,
            CancellationToken cancellationToken = default) =>
            await _componentStore.GetByIdAsync(id, cancellationToken);

        public async Task<ISchema?> GetSchemaByIdAsync(
            Guid id,
            CancellationToken cancellationToken = default)
        {
            Component? component = await GetByIdAsync(id, cancellationToken);

            if (component?.Schema is null)
            {
                return null;
            }

            return SchemaBuilder.New()
                .AddDocumentFromString(component.Schema)
                .Use(next => next)
                .ModifyOptions(c =>
                {
                    c.QueryTypeName = "Component";
                    c.StrictValidation = false;
                })
                .Create();
        }

        public Task<IReadOnlyCollection<Component>> GetManyByIdAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken) =>
            _componentStore.GetManyByIdAsync(ids, cancellationToken);

        public IQueryable<Component> Query() => _componentStore.Query();

        public async Task<Component> CreateAsync(
            string name,
            string? schema,
            CancellationToken cancellationToken)
        {
            var component = new Component
            {
                Id = Guid.NewGuid(),
                Name = name,
                Schema = schema,
                State = ComponentState.Active
            };

            return await _componentStore.AddAsync(component, cancellationToken);
        }

        public async Task<Component> UpdateSchemaAsync(
            Guid componentId,
            string schema,
            string? values,
            CancellationToken cancellationToken)
        {
            Component component = await _componentStore.GetByIdAsync(
                componentId,
                cancellationToken);

            component.Schema = schema;
            component.Values = values;

            await _componentStore.UpdateAsync(component, cancellationToken);

            return component;
        }
    }
}
