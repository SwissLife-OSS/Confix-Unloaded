using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Internal;
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

            return CreateSchema(component.Schema);
        }

        public Task<IReadOnlyCollection<Component>> GetManyByIdAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken) =>
            _componentStore.GetManyByIdAsync(ids, cancellationToken);

        public IQueryable<Component> Query() => _componentStore.Query();

        public async Task<Component> CreateAsync(
            string name,
            string? schemaSdl,
            Dictionary<string, object?>? values,
            CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentException("Value cannot be null or empty.", nameof(name));
            }

            if (schemaSdl is not null)
            {
                ISchema schema = CreateSchema(schemaSdl);

                if (values is not null)
                {
                    ValueHelper.ValidateDictionary(values, schema.QueryType);
                }
            }
            else
            {
                values = null;
            }

            var component = new Component
            {
                Id = Guid.NewGuid(),
                Name = name,
                Schema = schemaSdl,
                Values = values is not null ? JsonSerializer.Serialize(values) : null,
                State = ComponentState.Active
            };

            return await _componentStore.AddAsync(component, cancellationToken);
        }

        public async Task<Component> RenameAsync(
            Guid id,
            string name,
            CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentException("Value cannot be null or empty.", nameof(name));
            }

            Component component = await _componentStore.GetByIdAsync(id, cancellationToken);
            component.Name = name;
            return component;
        }

        public async Task<Component> SetSchemaAsync(
            Guid componentId,
            string schemaSdl,
            Dictionary<string, object?>? values,
            CancellationToken cancellationToken)
        {
            if (schemaSdl is null)
            {
                throw new ArgumentNullException(nameof(schemaSdl));
            }

            ISchema schema = CreateSchema(schemaSdl);

            if (values is not null)
            {
                ValueHelper.ValidateDictionary(values, schema.QueryType);
            }

            Component component = await _componentStore.GetByIdAsync(
                componentId,
                cancellationToken);

            component.Schema = schemaSdl;
            component.Values = values is not null ? JsonSerializer.Serialize(values) : null;

            await _componentStore.UpdateAsync(component, cancellationToken);

            return component;
        }

        public async Task<Component> SetValuesAsync(
            Guid componentId,
            Dictionary<string, object?> values,
            CancellationToken cancellationToken)
        {
            Component component = await _componentStore.GetByIdAsync(
                componentId,
                cancellationToken);

            if (component.Schema is null)
            {
                throw new InvalidOperationException("There is no schema.");
            }

            ISchema schema = CreateSchema(component.Schema);
            ValueHelper.ValidateDictionary(values, schema.QueryType);

            component.Values = JsonSerializer.Serialize(values);

            await _componentStore.UpdateAsync(component, cancellationToken);

            return component;
        }

        private static ISchema CreateSchema(string schema)
        {
            return SchemaBuilder.New()
                .AddDocumentFromString(schema)
                .Use(next => next)
                .ModifyOptions(c =>
                {
                    c.QueryTypeName = "Component";
                    c.StrictValidation = false;
                })
                .Create();
        }
    }
}
