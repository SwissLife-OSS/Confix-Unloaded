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

namespace Confix.Authoring;

internal sealed class ComponentService : IComponentService
{
    private readonly ISessionAccessor _accessor;
    private readonly IAuthorizationService _authorizationService;
    private readonly IChangeLogService _changeLogService;
    private readonly IDataLoader<Guid, Component?> _componentById;
    private readonly IComponentStore _componentStore;
    private readonly ISchemaValidator _schemaValidator;

    public ComponentService(
        ISessionAccessor accessor,
        IAuthorizationService authorizationService,
        IChangeLogService changeLogService,
        IDataLoader<Guid, Component?> componentById,
        IComponentStore componentStore,
        ISchemaValidator schemaValidator)
    {
        _accessor = accessor;
        _authorizationService = authorizationService;
        _changeLogService = changeLogService;
        _componentById = componentById;
        _componentStore = componentStore;
        _schemaValidator = schemaValidator;
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
        JsonElement values,
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

        _schemaValidator.ValidateSchema(schemaSdl);
        _schemaValidator.ValidateValues(values, schemaSdl);

        Component component =
            new(
                Guid.NewGuid(),
                name,
                schemaSdl,
                values: values.ToString(),
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

        _schemaValidator.ValidateSchema(schemaSdl);

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
        JsonElement values,
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

        _schemaValidator.ValidateValues(values, component.Schema);

        component = component with { Values = values.ToString(), Version = component.Version + 1 };
        ComponentValuesChange log = new(component.Id, component.Version, component.Values);

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

        if (component is null)
        {
            throw new ComponentNotFoundException(id);
        }

        return _schemaValidator.GetSchemaViolations(
            JsonDocument.Parse(component.Values).RootElement,
            component.Schema
        );
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
