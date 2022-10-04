using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Transactions;
using Confix.Authentication.Authorization;
using Confix.Authoring.Store;
using Confix.Authoring.Store.Mongo;
using Confix.Authoring.Variables.Changes;
using Confix.Common.Exceptions;
using Confix.CryptoProviders;
using static Confix.Authentication.Authorization.Permissions;

namespace Confix.Authoring;

public class VariableService : IVariableService
{
    private readonly IVariableStore _variableStore;
    private readonly IVariableValueStore _variableValueStore;
    private readonly IChangeLogService _changeLogService;
    private readonly IAuthorizationService _authorizationService;
    private readonly ISessionAccessor _sessionAccessor;
    private readonly IApplicationByPartIdDataLoader _applicationByPartId;
    private readonly IApplicationDataLoader _applicationById;
    private readonly IEncryptor _encryptor;
    private readonly IDecryptor _decryptor;

    public VariableService(
        IVariableStore variableStore,
        IVariableValueStore variableValueStore,
        IChangeLogService changeLogService,
        IEncryptor encryptor,
        IDecryptor decryptor,
        IAuthorizationService authorizationService,
        ISessionAccessor sessionAccessor,
        IApplicationByPartIdDataLoader applicationByPartId,
        IApplicationDataLoader applicationById)
    {
        _variableStore = variableStore;
        _variableValueStore = variableValueStore;
        _changeLogService = changeLogService;
        _encryptor = encryptor;
        _decryptor = decryptor;
        _authorizationService = authorizationService;
        _sessionAccessor = sessionAccessor;
        _applicationByPartId = applicationByPartId;
        _applicationById = applicationById;
    }

    public async Task<Variable?> CreateAsync(
        string name,
        string @namespace,
        bool isSecret,
        string? defaultValue,
        CancellationToken cancellationToken)
    {
        Variable variable = new(Guid.NewGuid(), VariableState.Active, name, isSecret, @namespace);

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
                    defaultValue,
                    cancellationToken: cancellationToken);

                transaction.Complete();
            }
        }

        return variable;
    }

    public async Task<IEnumerable<Variable>> GetAllAsync(CancellationToken cancellationToken)
    {
        var session = await _sessionAccessor.GetSession(cancellationToken);
        if (session is null)
        {
            return Array.Empty<Variable>();
        }

        return await _variableStore
            .GetAllByNamespacesAsync(session.Namespaces, cancellationToken);
    }

    // TODO move this out of the service into some kind of provider
    public async Task<IEnumerable<Variable?>> GetByNamesAsync(
        IEnumerable<string> names,
        CancellationToken cancellationToken)
    {
        return await _variableStore.GetByNamesAsync(names, cancellationToken);
    }

    // TODO move this out of the service into some kind of provider
    public async Task<IDictionary<string, VariableValue>> GetBestMatchingValuesAsync(
        IEnumerable<string> variableNames,
        Guid applicationId,
        Guid applicationPartId,
        Guid environmentId,
        CancellationToken cancellationToken)
    {
        ISet<string> distinctNames = variableNames.ToHashSet();

        var variables =
            await _variableStore.GetByNamesAsync(distinctNames, cancellationToken);

        IDictionary<string, VariableValue> values = new Dictionary<string, VariableValue>();

        IDictionary<Guid, Variable> ids = variables.ToDictionary(x => x.Id);

        var partValues = await _variableStore
            .GetByApplicationPartIdAsync(applicationPartId, ids.Keys, cancellationToken);

        foreach (var value in partValues)
        {
            if (ids.TryGetValue(value.Key.VariableId, out var variable) &&
                value.Key.EnvironmentId == environmentId)
            {
                values[variable.Name] = value;
                ids.Remove(value.Key.VariableId);
            }
        }

        var appValues = await _variableStore
            .GetByApplicationIdAsync(applicationId, ids.Keys, cancellationToken);

        foreach (var value in appValues)
        {
            if (ids.TryGetValue(value.Key.VariableId, out var variable) &&
                value.Key.EnvironmentId == environmentId)
            {
                values[variable.Name] = value;
                ids.Remove(value.Key.VariableId);
            }
        }

        var globalValues =
            await _variableStore.GetGlobalVariableValue(ids.Keys, cancellationToken);

        foreach (var value in globalValues)
        {
            if (ids.TryGetValue(value.Key.VariableId, out var variable) &&
                value.Key.EnvironmentId == environmentId)
            {
                values[variable.Name] = value;
                ids.Remove(value.Key.VariableId);
            }
        }

        return values;
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
            queryable = queryable
                .Where(x => x.Name.Contains(search) || (x.Namespace.Contains(search)));
        }

        return queryable;
    }

    public async Task<Variable?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken)
    {
        var variable = await _variableStore.GetByIdAsync(id, cancellationToken);
        return await _authorizationService
            .RuleFor<Variable>()
            .AuthorizeOrNullAsync(variable, Read, cancellationToken);
    }

    public async Task<VariableValue> SaveValueAsync(
        Guid variableId,
        string value,
        Guid? valueId = null,
        Guid? applicationId = null,
        Guid? partId = null,
        Guid? environmentId = null,
        CancellationToken cancellationToken = default)
    {
        var variable = await GetByIdAsync(variableId, cancellationToken);

        if (!await _authorizationService
                .RuleFor<Variable>()
                .IsAuthorizedAsync(variable, Write, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        return await SaveVariableValueAsync(variable,
            value,
            valueId,
            applicationId,
            partId,
            environmentId,
            cancellationToken);
    }

    public async Task<IEnumerable<VariableValue>> GetValuesAsync(
        VariableValueFilter filter,
        bool decrypt,
        CancellationToken cancellationToken)
    {
        var variable = await _variableStore.GetByIdAsync(filter.Id, cancellationToken);

        if (!await _authorizationService
                .RuleFor<Variable>()
                .IsAuthorizedAsync(variable, Read, cancellationToken))
        {
            return Array.Empty<VariableValue>();
        }

        return await GetValuesAsync(variable!, filter, decrypt, cancellationToken);
    }

    public async Task<IEnumerable<VariableValue>> GetValuesByApplicationPartAsync(
        Guid applicationPartId,
        CancellationToken cancellationToken)
    {
        var applicationPart = _applicationByPartId
            .LoadAsync(applicationPartId, cancellationToken);

        if (!await _authorizationService
                .RuleFor<Variable>()
                .IsAuthorizedFromAsync(applicationPart, Read, cancellationToken))
        {
            return Array.Empty<VariableValue>();
        }

        return await _variableStore.GetByApplicationPartIdAsync(applicationPartId,
            cancellationToken);
    }

    public async Task<IEnumerable<VariableValue>> GetValuesByApplicationAsync(
        Guid applicationId,
        CancellationToken cancellationToken)
    {
        var applicationPart = _applicationById.LoadAsync(applicationId, cancellationToken);

        if (!await _authorizationService
                .RuleFor<Variable>()
                .IsAuthorizedFromAsync(applicationPart, Read, cancellationToken))
        {
            return Array.Empty<VariableValue>();
        }

        return await _variableStore.GetByApplicationIdAsync(applicationId, cancellationToken);
    }

    public async Task<IEnumerable<VariableValue>> GetGlobalValues(
        CancellationToken cancellationToken)
    {
        var session = await _sessionAccessor.GetSession(cancellationToken);
        if (session is null)
        {
            return Array.Empty<VariableValue>();
        }

        return await _variableStore.GetGlobalVariableValue(cancellationToken);
    }

    public async Task<IEnumerable<VariableValue>> GetValuesAsync(
        Variable variable,
        VariableValueFilter filter,
        bool decrypt,
        CancellationToken cancellationToken)
    {
        if (!await _authorizationService
                .RuleFor<Variable>()
                .IsAuthorizedAsync(variable, Read, cancellationToken))
        {
            return Array.Empty<VariableValue>();
        }

        var values = await _variableValueStore.GetByFilterAsync(filter, cancellationToken);

        if (variable.IsSecret &&
            decrypt &&
            await _authorizationService
                .RuleFor<Variable>()
                .IsAuthorizedAsync(variable, Decrypt, cancellationToken))
        {
            values = await values
                .ToAsyncEnumerable()
                .SelectAwait(async value => value with
                {
                    Value = await _decryptor.DecryptAsync(value.EncryptedValue!,
                        cancellationToken)
                })
                .ToArrayAsync(cancellationToken);
        }

        return values;
    }

    public async Task<VariableValue> DeleteValueAsync(Guid id, CancellationToken cancellationToken)
    {
        var value = await _variableValueStore.GetByIdAsync(id, cancellationToken);

        var variable = await _variableStore.GetByIdAsync(value.Key.VariableId, cancellationToken);

        if (!await _authorizationService
                .RuleFor<Variable>()
                .IsAuthorizedAsync(variable, Write, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        variable = variable with { Version = variable.Version + 1 };

        DeleteVariableValueChange log =
            new(variable.Id, variable.Version, value, value.Key);

        using (var transaction =
               new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
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

        variable = variable with { Name = name, Version = variable.Version + 1 };

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
        Variable? variable,
        string value,
        Guid? valueId = null,
        Guid? applicationId = null,
        Guid? partId = null,
        Guid? environmentId = null,
        CancellationToken cancellationToken = default)
    {
        VariableValue? variableValue = null;
        if (valueId is not null)
        {
            variableValue =
                await _variableValueStore.GetByIdAsync(valueId.Value, cancellationToken);
        }

        variableValue ??= new VariableValue(
            Guid.NewGuid(),
            new VariableKey(
                variable.Id,
                applicationId,
                partId,
                environmentId
            ),
            string.Empty,
            null,
            0);

        if (variable.IsSecret)
        {
            var encrypted =
                await _encryptor.EncryptAsync(
                    "variable",
                    value,
                    environmentId ?? Guid.Empty,
                    cancellationToken);

            variableValue = variableValue with { EncryptedValue = encrypted };
        }
        else
        {
            variableValue = variableValue with { Value = value };
        }

        VariableValueChange log = new(
            variable.Id,
            variable.Version,
            variableValue.Key,
            variableValue.Value,
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
