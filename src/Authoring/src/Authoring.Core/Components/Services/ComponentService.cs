using System.Text.Json;
using System.Transactions;
using Confix.Authentication.Authorization;
using Confix.Authoring.Changes;
using Confix.Authoring.Internal;
using Confix.Authoring.Store;
using Confix.Common.Exceptions;
using GreenDonut;
using HotChocolate;
using static Confix.Authoring.Internal.ValueHelper;

namespace Confix.Authoring;

public sealed class ComponentService : IComponentService
{
    private readonly IComponentStore _componentStore;
    private readonly IDataLoader<Guid, Component?> _componentById;
    private readonly ISchemaService _schemaService;
    private readonly IChangeLogService _changeLogService;
    private readonly IAuthorizationService _authorizationService;
    private readonly ISessionAccessor _accessor;

    public ComponentService(
        IComponentStore componentStore,
        IDataLoader<Guid, Component?> componentById,
        ISchemaService schemaService,
        IChangeLogService changeLogService,
        IAuthorizationService authorizationService,
        ISessionAccessor accessor)
    {
        _componentStore = componentStore;
        _componentById = componentById;
        _schemaService = schemaService;
        _changeLogService = changeLogService;
        _authorizationService = authorizationService;
        _accessor = accessor;
    }

    // TODO add read component permission
    public async Task<Component?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default) =>
        await _authorizationService.AuthorizeAsync(
            await _componentById.LoadAsync(id, cancellationToken),
            cancellationToken);

    public async Task<ISchema?> GetSchemaByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var component = await GetByIdAsync(id, cancellationToken);

        if (component?.Schema is null ||
            !await _authorizationService.IsAuthorized(component, cancellationToken))
        {
            return null;
        }

        return _schemaService.CreateSchema(component.Schema);
    }

    public async Task<IQueryable<Component>> Query(CancellationToken cancellationToken)
    {
        var session = await _accessor.GetSession(cancellationToken);
        if (session is null)
        {
            return Array.Empty<Component>().AsQueryable();
        }

        return _componentStore.Query().Where(x => session.Namespaces.Contains(x.Namespace));
    }

    public async Task<Component> CreateAsync(
        string name,
        string? schemaSdl,
        string @namespace,
        IDictionary<string, object?>? values,
        CancellationToken cancellationToken)
    {
        var session = await _accessor.GetSession(cancellationToken);
        if (session is null || session.HasPermission(@namespace, Permissions.WriteComponents))
        {
            throw new UnauthorizedOperationException();
        }

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
            ComponentState.Active,
            @namespace);

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
        var session = await _accessor.GetSession(cancellationToken);
        if (session is null)
        {
            throw new UnauthorizedOperationException();
        }

        if (string.IsNullOrEmpty(name))
        {
            throw new ArgumentException("Value cannot be null or empty.", nameof(name));
        }

        var component = await _componentById.LoadAsync(id, cancellationToken);

        if (component is null)
        {
            throw new ComponentNotFoundException(id);
        }

        if (!session.HasPermission(component.Namespace, Permissions.WriteComponents))
        {
            throw new UnauthorizedOperationException();
        }

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
        var session = await _accessor.GetSession(cancellationToken);
        if (session is null)
        {
            throw new UnauthorizedOperationException();
        }

        if (schemaSdl is null)
        {
            throw new ArgumentNullException(nameof(schemaSdl));
        }

        // we ensure that the schema is valid.
        _schemaService.CreateSchema(schemaSdl);

        var component = await _componentById.LoadAsync(componentId, cancellationToken);

        if (component is null)
        {
            throw new ComponentNotFoundException(componentId);
        }

        if (!session.HasPermission(component.Namespace, Permissions.WriteComponents))
        {
            throw new UnauthorizedOperationException();
        }

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
        IDictionary<string, object?> values,
        CancellationToken cancellationToken)
    {
        var session = await _accessor.GetSession(cancellationToken);
        if (session is null)
        {
            throw new UnauthorizedOperationException();
        }

        var component = await _componentById.LoadAsync(id, cancellationToken);

        if (component is null)
        {
            throw new ComponentNotFoundException(id);
        }

        if (!session.HasPermission(component.Namespace, Permissions.WriteComponents))
        {
            throw new UnauthorizedOperationException();
        }

        if (component?.Schema is null)
        {
            throw new InvalidOperationException("There is no schema.");
        }

        string serializedValues =
            _schemaService.CreateValuesForSchema(component.Schema, values);

        component = component with { Values = serializedValues, Version = component.Version + 1 };

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
        string values,
        CancellationToken cancellationToken)
    {
        var component = await _componentById.LoadAsync(id, cancellationToken);

        if (!await _authorizationService.IsAuthorized(component, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        if (component?.Schema is null)
        {
            // TODO proper exception
            throw new InvalidOperationException("There is no schema.");
        }

        var schema = _schemaService.CreateSchema(component.Schema);

        var dictionary = DeserializeDictionary(
            JsonSerializer.Deserialize<JsonElement>(values),
            schema.QueryType);

        return ValidateDictionary(schema, dictionary, schema.QueryType);
    }

    public async Task<IReadOnlyList<SchemaViolation>> GetSchemaViolationsAsync(
        Guid id,
        IDictionary<string, object?> values,
        CancellationToken cancellationToken)
    {
        var component = await _componentById.LoadAsync(id, cancellationToken);

        if (!await _authorizationService.IsAuthorized(component, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        if (component?.Schema is null)
        {
            // TODO proper exception
            throw new InvalidOperationException("There is no schema.");
        }

        var schema = _schemaService.CreateSchema(component.Schema);

        return ValidateDictionary(schema, values, schema.QueryType);
    }

    public async Task<IDictionary<string, object?>?> GetDefaultValuesAsync(
        Guid id,
        CancellationToken cancellationToken)
    {
        var component = await _componentById.LoadAsync(id, cancellationToken);

        if (!await _authorizationService.IsAuthorized(component, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        if (component?.Schema is null)
        {
            return null;
        }

        var schema = _schemaService.CreateSchema(component.Schema);
        return CreateDefaultObjectValue(schema, schema.QueryType);
    }
}
