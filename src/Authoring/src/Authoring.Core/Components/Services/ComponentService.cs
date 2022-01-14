using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Transactions;
using Confix.Authoring.Changes;
using Confix.Authoring.Internal;
using Confix.Authoring.Store;
using GreenDonut;
using HotChocolate;
using static Confix.Authoring.Internal.ValueHelper;

namespace Confix.Authoring;

public sealed class ComponentService : IComponentService
{
    private readonly IComponentStore _componentStore;
    private readonly IDataLoader<Guid, Component> _componentById;
    private readonly ISchemaService _schemaService;
    private readonly IChangeLogService _changeLogService;

    public ComponentService(
        IComponentStore componentStore,
        IDataLoader<Guid, Component> componentById,
        ISchemaService schemaService,
        IChangeLogService changeLogService)
    {
        _componentStore = componentStore;
        _componentById = componentById;
        _schemaService = schemaService;
        _changeLogService = changeLogService;
    }

    public async Task<Component?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default) =>
        await _componentById.LoadAsync(id, cancellationToken);

    public async Task<ISchema?> GetSchemaByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        Component? component = await GetByIdAsync(id, cancellationToken);

        if (component?.Schema is null)
        {
            return null;
        }

        return _schemaService.CreateSchema(component.Schema);
    }

    public async Task<IReadOnlyCollection<Component>> GetManyByIdAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken) =>
        await _componentById.LoadAsync(ids.ToArray(), cancellationToken);

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

        string? serializedValues = null;
        if (schemaSdl is not null)
        {
            ISchema schema = _schemaService.CreateSchema(schemaSdl);

            if (values is not null)
            {
                serializedValues = _schemaService.CreateValuesForSchema(schema, values);
            }
        }

        Component component = new(Guid.NewGuid(),
            name,
            schemaSdl,
            serializedValues,
            ComponentState.Active);

        CreateComponentChange log = new(component.Id, component.Version, component);

        using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        {
            await _changeLogService.CreateAsync(log, cancellationToken);
            await _componentStore.AddAsync(component, cancellationToken);

            transaction.Complete();
        }

        return component;
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

        Component component = await _componentById.LoadAsync(id, cancellationToken);
        component = component with { Name = name, Version = component.Version + 1 };

        RenameComponentChange log = new(component.Id, component.Version, name);

        using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        {
            await _changeLogService.CreateAsync(log, cancellationToken);
            await _componentStore.UpdateAsync(component, cancellationToken);

            transaction.Complete();
        }

        return component;
    }

    public async Task<Component> SetSchemaAsync(
        Guid componentId,
        string schemaSdl,
        CancellationToken cancellationToken)
    {
        if (schemaSdl is null)
        {
            throw new ArgumentNullException(nameof(schemaSdl));
        }

        // we ensure that the schema is valid.
        _schemaService.CreateSchema(schemaSdl);

        Component component = await _componentById.LoadAsync(componentId, cancellationToken);

        component = component with { Schema = schemaSdl, Version = component.Version + 1 };

        ComponentSchemaChange log = new(component.Id, component.Version, schemaSdl);

        using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        {
            await _changeLogService.CreateAsync(log, cancellationToken);
            await _componentStore.UpdateAsync(component, cancellationToken);
            transaction.Complete();
        }

        return component;
    }

    public async Task<Component> SetValuesAsync(
        Guid id,
        Dictionary<string, object?> values,
        CancellationToken cancellationToken)
    {
        Component component = await _componentById.LoadAsync(id, cancellationToken);

        if (component.Schema is null)
        {
            throw new InvalidOperationException("There is no schema.");
        }

        string serializedValues =
            _schemaService.CreateValuesForSchema(component.Schema, values);

        component = component with
        {
            Values = serializedValues,
            Version = component.Version + 1
        };

        ComponentValuesChange log = new(component.Id, component.Version, serializedValues);

        using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        {
            await _changeLogService.CreateAsync(log, cancellationToken);
            await _componentStore.UpdateAsync(component, cancellationToken);
            transaction.Complete();
        }

        return component;
    }

    public async Task<IReadOnlyList<SchemaViolation>> GetSchemaViolationsAsync(
        Guid id,
        Dictionary<string, object?> values,
        CancellationToken cancellationToken)
    {
        Component component = await _componentById.LoadAsync(
            id,
            cancellationToken);

        if (component.Schema is null)
        {
            // TODO proper exception
            throw new InvalidOperationException("There is no schema.");
        }

        ISchema schema = _schemaService.CreateSchema(component.Schema);

        return ValidateDictionary(schema,values, schema.QueryType);
    }

    public async Task<Dictionary<string, object?>?> GetDefaultValuesAsync(
        Guid id,
        CancellationToken cancellationToken)
    {
        Component component = await _componentById.LoadAsync(
            id,
            cancellationToken);

        if (component?.Schema is null)
        {
            return null;
        }

        ISchema schema = _schemaService.CreateSchema(component.Schema);
        return CreateDefaultObjectValue(schema,schema.QueryType);
    }
}
