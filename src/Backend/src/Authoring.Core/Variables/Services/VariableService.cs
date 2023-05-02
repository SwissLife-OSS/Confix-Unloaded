using System.Transactions;
using Confix.Authentication.Authorization;
using Confix.Authoring.Store;
using Confix.Authoring.Store.Mongo;
using Confix.Authoring.Variables.Changes;
using Confix.Common.Exceptions;
using Confix.CryptoProviders;
using static Confix.Authentication.Authorization.Permissions;

namespace Confix.Authoring;

internal sealed class VariableService : IVariableService
{
    private readonly IAuthorizationService _authorizationService;
    private readonly IVariableDataLoader _variableById;
    private readonly IChangeLogService _changeLogService;
    private readonly IEncryptor _encryptor;
    private readonly ISessionAccessor _sessionAccessor;
    private readonly IVariableStore _variableStore;
    private readonly IVariableValueStore _variableValueStore;

    public VariableService(
        IVariableStore variableStore,
        IVariableValueStore variableValueStore,
        IChangeLogService changeLogService,
        IEncryptor encryptor,
        IAuthorizationService authorizationService,
        ISessionAccessor sessionAccessor,
        IVariableDataLoader variableById)
    {
        _variableStore = variableStore;
        _variableValueStore = variableValueStore;
        _changeLogService = changeLogService;
        _encryptor = encryptor;
        _authorizationService = authorizationService;
        _sessionAccessor = sessionAccessor;
        _variableById = variableById;
    }

    public async Task<Variable?> CreateAsync(
        string name,
        string @namespace,
        bool isSecret,
        VariableValueScope scope,
        string? defaultValue,
        CancellationToken cancellationToken)
    {
        Variable variable =
            new(Guid.NewGuid(), VariableState.Active, name, isSecret, @namespace);

        if (!await _authorizationService
                .RuleFor<Variable>()
                .IsAuthorizedAsync(variable, Write, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        await _variableStore.CreateAsync(variable, cancellationToken);

        if (defaultValue != null)
        {
            CreateVariableChange log = new(variable.Id, variable.Version, variable);

            using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                await _changeLogService.CreateAsync(log, cancellationToken);
                await SaveVariableValueAsync(
                    variable,
                    scope,
                    defaultValue,
                    cancellationToken: cancellationToken);

                transaction.Complete();
            }
        }

        return variable;
    }

    public async Task<IQueryable<Variable>> SearchVariables(
        string? search,
        CancellationToken cancellationToken)
    {
        var session = await _sessionAccessor.GetSession(cancellationToken);
        if (session is null)
        {
            return Array.Empty<Variable>().AsQueryable();
        }

        var queryable = _variableStore
            .Query()
            .Where(x => session.Namespaces.Contains(x.Namespace));

        if (search is not null)
        {
            queryable =
                queryable.Where(x => x.Name.Contains(search) || x.Namespace.Contains(search));
        }

        return queryable;
    }

    public async Task<Variable?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var variable = await _variableStore.GetByIdAsync(id, cancellationToken);

        return await _authorizationService
            .RuleFor<Variable>()
            .AuthorizeOrNullAsync(variable, Read, cancellationToken);
    }

    public async Task<VariableValue> SaveValueAsync(
        Guid variableId,
        string value,
        VariableValueScope scope,
        CancellationToken cancellationToken = default)
    {
        var variable = await GetByIdAsync(variableId, cancellationToken);

        if (!await _authorizationService
                .RuleFor<Variable>()
                .IsAuthorizedAsync(variable, Write, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        return await SaveVariableValueAsync(variable!, scope, value, cancellationToken);
    }

    public async Task<IEnumerable<VariableValue>> GetValuesAsync(
        IEnumerable<Guid>? variableIds,
        IEnumerable<VariableValueScope>? filter,
        CancellationToken cancellationToken)
    {
        await _authorizationService.EnsureAuthenticated(cancellationToken);

        // TODO add namespace filter if there are no filters provided &
        // verify namespace filter when provided
        var values =
            await _variableValueStore.GetByFilterAsync(variableIds, filter, cancellationToken);

        // prefetch variables for authorization (TODO: we have to prefetch more (apps => namespaces))
        await _variableById
            .LoadAsync(values.Select(x => x.VariableId).Distinct(), cancellationToken);

        var result = new List<VariableValue>();
        foreach (var value in values)
        {
            if (await _authorizationService
                    .RuleFor<VariableValue>()
                    .IsAuthorizedAsync(value, Read, cancellationToken))
            {
                result.Add(value);
            }
        }

        return result;
    }

    public async Task<VariableValue> DeleteValueAsync(Guid id, CancellationToken cancellationToken)
    {
        var value = await _variableValueStore.GetByIdAsync(id, cancellationToken);

        var variable = await _variableStore.GetByIdAsync(value.VariableId, cancellationToken);

        if (!await _authorizationService
                .RuleFor<Variable>()
                .IsAuthorizedAsync(variable, Write, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        variable = variable! with { Version = variable.Version + 1 };

        var log = new DeleteVariableValueChange(variable.Id, variable.Version, value);

        using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        {
            await _changeLogService.CreateAsync(log, cancellationToken);
            await _variableStore.UpdateAsync(variable, cancellationToken);
            await _variableValueStore.DeleteAsync(id, cancellationToken);

            transaction.Complete();
        }

        return value;
    }

    public async Task<Variable?> RenameAsync(
        Guid id,
        string name,
        CancellationToken cancellationToken)
    {
        var variable = await _variableStore.GetByIdAsync(id, cancellationToken);

        if (!await _authorizationService
                .RuleFor<Variable>()
                .IsAuthorizedAsync(variable, Write, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        variable = variable! with { Name = name, Version = variable.Version + 1 };

        RenameVariableChange log = new(variable.Id, variable.Version, name);

        using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        {
            await _changeLogService.CreateAsync(log, cancellationToken);
            await _variableStore.UpdateAsync(variable, cancellationToken);

            transaction.Complete();
        }

        return variable;
    }

    private async Task<VariableValue> SaveVariableValueAsync(
        Variable variable,
        VariableValueScope scope,
        string value,
        CancellationToken cancellationToken = default)
    {
        var variables = await _variableValueStore.GetByFilterAsync(
            new[] { variable.Id },
            new[] { scope },
            cancellationToken);

        var variableValue = variables.SingleOrDefault() ??
            new VariableValue(Guid.NewGuid(), scope, null, 0);

        const string topic = "variable";

        var encrypted = await _encryptor
            .EncryptAsync(topic, value, scope.EnvironmentId ?? Guid.Empty, cancellationToken);

        variableValue = variableValue with { EncryptedValue = encrypted };

        var log = new VariableValueChange(
            variable.Id,
            variable.Version,
            scope,
            scope.EnvironmentId,
            variableValue.EncryptedValue);

        using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        {
            await _changeLogService.CreateAsync(log, cancellationToken);
            await _variableValueStore.SaveAsync(variableValue, cancellationToken);

            transaction.Complete();
        }

        return variableValue;
    }
}
