using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Transactions;
using Confix.Authoring.Store;
using Confix.Authoring.Store.Mongo;
using Confix.Authoring.Variables.Changes;

namespace Confix.Authoring;

public class VariableService
    : IVariableService
{
    private readonly IVariableStore _variableStore;
    private readonly IVariableValueStore _variableValueStore;
    private readonly IChangeLogService _changeLogService;
    private readonly IVariableCryptoProvider _cryptoProvider;

    public VariableService(
        IVariableStore variableStore,
        IVariableValueStore variableValueStore,
        IChangeLogService changeLogService,
        IVariableCryptoProvider cryptoProvider)
    {
        _variableStore = variableStore;
        _variableValueStore = variableValueStore;
        _changeLogService = changeLogService;
        _cryptoProvider = cryptoProvider;
    }

    public async Task<Variable> CreateAsync(
        string name,
        string @namespace,
        bool isSecret,
        string? defaultValue,
        CancellationToken cancellationToken)
    {
        Variable variable = new(Guid.NewGuid(), VariableState.Active, name, isSecret, @namespace);

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
        return await _variableStore.GetAllAsync(cancellationToken);
    }

    public IQueryable<Variable> SearchVariables(string? search)
    {
        return search is null
            ? _variableStore.Query()
            : _variableStore.Query()
                .Where(x =>
                    x.Name.Contains(search) ||
                    (x.Namespace != null && x.Namespace.Contains(search)));
    }

    public async Task<IEnumerable<Variable>> GetManyAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken)
    {
        return await _variableStore.GetManyAsync(ids, cancellationToken);
    }

    public async Task<Variable> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken)
    {
        return await _variableStore.GetByIdAsync(id, cancellationToken);
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
        Variable variable = await GetByIdAsync(variableId, cancellationToken);

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
        Variable variable =
            await _variableStore.GetByIdAsync(filter.Id, cancellationToken);

        return await GetValuesAsync(variable, filter, decrypt, cancellationToken);
    }

    public async Task<IEnumerable<VariableValue>> GetValuesByApplicationPartAsync(
        Guid applicationPartId,
        CancellationToken cancellationToken)
    {
        return await _variableStore.GetByApplicationPartIdAsync(applicationPartId,
            cancellationToken);
    }

    public async Task<IEnumerable<VariableValue>> GetValuesByApplicationAsync(
        Guid applicationId,
        CancellationToken cancellationToken)
    {
        return await _variableStore.GetByApplicationIdAsync(applicationId, cancellationToken);
    }

    public async Task<IEnumerable<VariableValue>> GetGlobalValues(
        CancellationToken cancellationToken) =>
        await _variableStore.GetGlobalVariableValue(cancellationToken);

    public async Task<IEnumerable<VariableValue>> GetValuesAsync(
        Variable variable,
        VariableValueFilter filter,
        bool decrypt,
        CancellationToken cancellationToken)
    {
        IEnumerable<VariableValue> values = await _variableValueStore.GetByFilterAsync(
            filter,
            cancellationToken);

        if (variable.IsSecret && decrypt)
        {
            values = await values
                .ToAsyncEnumerable()
                .SelectAwait(async value => value with
                {
                    Value = await _cryptoProvider.DecryptAsync(
                        value.Value,
                        value.Encryption!,
                        cancellationToken)
                })
                .ToArrayAsync(cancellationToken);
        }

        return values;
    }

    public async Task<VariableValue> DeleteValueAsync(Guid id, CancellationToken cancellationToken)
    {
        VariableValue value = await _variableValueStore.GetByIdAsync(id, cancellationToken);
        Variable variable = await _variableStore.GetByIdAsync(
            value.Key.VariableId,
            cancellationToken);

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

    public async Task<Variable> RenameAsync(
        Guid id,
        string name,
        CancellationToken cancellationToken)
    {
        Variable variable = await _variableStore.GetByIdAsync(id, cancellationToken);

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
        Variable variable,
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
            ValueEncryptionResult encrypted =
                await _cryptoProvider.EncryptAsync(value, cancellationToken);

            variableValue = variableValue with
            {
                Value = encrypted.CipherValue,
                Encryption = encrypted.EncryptionInfo,
            };
        }
        else
        {
            variableValue = variableValue with { Value = value };
        }

        VariableValueChange log =
            new(variable.Id, variable.Version, variableValue.Key, variableValue.Value);

        using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        {
            await _changeLogService.CreateAsync(log, cancellationToken);
            await _variableValueStore.SaveAsync(variableValue, cancellationToken);

            transaction.Complete();
        }

        return variableValue;
    }
}
