using System.Text.Json;
using System.Transactions;
using Confix.Authentication.Authorization;
using Confix.Authoring.Changes;
using Confix.Authoring.Internal;
using Confix.Authoring.Store;
using Confix.Common.Exceptions;
using GreenDonut;
using HotChocolate;
using static Confix.Authentication.Authorization.Permissions;
using static Confix.Authoring.Internal.ValueHelper;

namespace Confix.Authoring;

internal sealed class ComponentService : IComponentService
{
    private readonly ISessionAccessor _accessor;
    private readonly IAuthorizationService _authorizationService;
    private readonly IChangeLogService _changeLogService;
    private readonly IDataLoader<Guid, Component?> _componentById;
    private readonly IComponentStore _componentStore;
    private readonly ISchemaService _schemaService;

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

    public async Task<Component?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var component = await _componentById.LoadAsync(id, cancellationToken);

        return await _authorizationService
            .RuleFor<Component>()
            .AuthorizeOrNullAsync(component, Read, cancellationToken);
    }

    public async Task<ISchema?> GetSchemaByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var component = await GetByIdAsync(id, cancellationToken);

        if (component?.Schema is null || !await _authorizationService
                .RuleFor<Component>()
                .IsAuthorizedAsync(component, Read, cancellationToken))
        {
            return null;
        }

        return _schemaService.CreateSchema(component.Schema);
    }

    public async Task<IReadOnlyList<Component>> Search(
        IReadOnlyList<ComponentScope> scopes,
        string? search,
        int skip,
        int take,
        CancellationToken cancellationToken)
    {
        var session = await _accessor.GetSession(cancellationToken);
        if (session is null)
        {
            return Array.Empty<Component>();
        }

        var namespaces = session.GetNamespacesWithAccess(Scope.Component, Read);

        return await _componentStore.GetByFilterAsync(
            namespaces,
            scopes,
            search,
            skip,
            take,
            cancellationToken);
    }

    public async Task<Component> CreateAsync(
        string name,
        string schemaSdl,
        string @namespace,
        IReadOnlyList<ComponentScope> scopes,
        IDictionary<string, object?> values,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw ComponentValidationFailed.NameRequired();
        }

        if (scopes.Count == 0)
        {
            throw ComponentValidationFailed.AtLeastOneScopeIsRequired();
        }

        ISchema schema = _schemaService.CreateSchema(schemaSdl);
        string serializedValues = _schemaService.CreateValuesForSchema(schema, values);

        Component component =
            new(
                Guid.NewGuid(),
                name,
                schemaSdl,
                serializedValues,
                @namespace,
                scopes,
                version: 1);

        if (!await _authorizationService
                .RuleFor<Component>()
                .IsAuthorizedAsync(component, Write, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

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
        var component = await _componentById.LoadAsync(id, cancellationToken);

        if (!await _authorizationService
                .RuleFor<Component>()
                .IsAuthorizedAsync(component, Write, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        if (component is null)
        {
            throw new ComponentNotFoundException(id);
        }

        if (string.IsNullOrEmpty(name))
        {
            throw new ArgumentException("Value cannot be null or empty.", nameof(name));
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
        var component = await _componentById.LoadAsync(componentId, cancellationToken);

        if (!await _authorizationService
                .RuleFor<Component>()
                .IsAuthorizedAsync(component, Write, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        if (component is null)
        {
            throw new ComponentNotFoundException(componentId);
        }

        if (schemaSdl is null)
        {
            throw new ArgumentNullException(nameof(schemaSdl));
        }

        // we ensure that the schema is valid.
        _schemaService.CreateSchema(schemaSdl);

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
        var component = await _componentById.LoadAsync(id, cancellationToken);

        if (!await _authorizationService
                .RuleFor<Component>()
                .IsAuthorizedAsync(component, Write, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        if (component is null)
        {
            throw new ComponentNotFoundException(id);
        }

        if (component.Schema is null)
        {
            throw new InvalidOperationException("There is no schema.");
        }

        var serializedValues = _schemaService.CreateValuesForSchema(component.Schema, values);

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

        if (!await _authorizationService
                .RuleFor<Component>()
                .IsAuthorizedAsync(component, Read, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        if (component?.Schema is null)
        {
            // TODO proper exception
            throw new InvalidOperationException("There is no schema.");
        }

        var schema = _schemaService.CreateSchema(component.Schema);

        var dictionary = DeserializeDictionary(JsonSerializer.Deserialize<JsonElement>(values),
            schema.QueryType);

        return ValidateDictionary(schema, dictionary, schema.QueryType);
    }

    public async Task<IReadOnlyList<SchemaViolation>> GetSchemaViolationsAsync(
        Guid id,
        IDictionary<string, object?> values,
        CancellationToken cancellationToken)
    {
        var component = await _componentById.LoadAsync(id, cancellationToken);

        if (!await _authorizationService
                .RuleFor<Component>()
                .IsAuthorizedAsync(component, Read, cancellationToken))
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

    public async Task<Component> ChangeComponentScopeByIdAsync(
        Guid id,
        IReadOnlyList<ComponentScope> scopes,
        CancellationToken cancellationToken)
    {
        var component = await _componentById.LoadAsync(id, cancellationToken);

        if (!await _authorizationService
                .RuleFor<Component>()
                .IsAuthorizedAsync(component, Write, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        if (component is null)
        {
            throw new ComponentNotFoundException(id);
        }

        if (scopes.Count == 0)
        {
            throw ComponentValidationFailed.AtLeastOneScopeIsRequired();
        }

        component = component with { Scopes = scopes };

        var log = new ChangeScopeOfComponentChange(component.Id, component.Version, scopes);

        using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        {
            await _changeLogService.CreateAsync(log, cancellationToken);
            await _componentStore.UpdateAsync(component, cancellationToken);

            transaction.Complete();
        }

        return component;
    }
}
