using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using Confix.Authoring.Store.Mongo;

namespace Confix.Authoring
{
    public class VariableService : IVariableService
    {
        private readonly IVariableStore _variableStore;
        private readonly IVariableValueStore _variableValueStore;
        private readonly IVariableCryptoProvider _cryptoProvider;

        public VariableService(
            IVariableStore variableStore,
            IVariableValueStore variableValueStore,
            IVariableCryptoProvider cryptoProvider)
        {
            _variableStore = variableStore;
            _variableValueStore = variableValueStore;
            _cryptoProvider = cryptoProvider;
        }

        public async Task<Variable> CreateAsync(
            CreateVariableRequest request,
            CancellationToken cancellationToken)
        {
            var variable = new Variable
            {
                Id = Guid.NewGuid(),
                State = VariableState.Active,
                Name = request.Name,
                IsSecret = request.IsSecret,
                Namespace = request.Namespace
            };

            await _variableStore.CreateAsync(variable, cancellationToken);

            if (request.DefaultValue != null)
            {
                await SaveVariableValueAsync(
                    variable,
                    new SaveVariableValueRequest(variable.Id, request.DefaultValue),
                    cancellationToken);
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
            SaveVariableValueRequest request,
            CancellationToken cancellationToken)
        {
            Variable variable = await GetByIdAsync(request.VariableId, cancellationToken);

            return await SaveVariableValueAsync(variable, request, cancellationToken);
        }

        public async Task<IEnumerable<VariableValue>> GetValuesAsync(
            GetVariableValuesRequest request,
            CancellationToken cancellationToken)
        {
            Variable variable =
                await _variableStore.GetByIdAsync(request.Filter.Id, cancellationToken);

            return await GetValuesAsync(variable, request, cancellationToken);
        }

        public async Task<IEnumerable<VariableValue>> GetValuesAsync(
            Variable variable,
            GetVariableValuesRequest request,
            CancellationToken cancellationToken)
        {
            IEnumerable<VariableValue> values = await _variableValueStore.GetByFilterAsync(
                request.Filter,
                cancellationToken);

            if (variable.IsSecret && request.Decrypt)
            {
                foreach (VariableValue value in values)
                {
                    value.Value = await _cryptoProvider.DecryptAsync(
                        value.Value,
                        value.Encryption!,
                        cancellationToken);
                }
            }

            return values;
        }

        public async Task<Variable> DeleteValueAsync(Guid id, CancellationToken cancellationToken)
        {
            VariableValue value = await _variableValueStore.GetByIdAsync(id, cancellationToken);

            await _variableValueStore.DeleteAsync(id, cancellationToken);

            Variable variable = await _variableStore.GetByIdAsync(
                value.Key.VariableId,
                cancellationToken);

            return variable;
        }

        public async Task<Variable> RenameAsync(
            Guid id,
            string name,
            CancellationToken cancellationToken)
        {
            Variable variable = await _variableStore.GetByIdAsync(id, cancellationToken);
            variable.Name = name;
            await _variableStore.UpdateAsync(variable, cancellationToken);

            return variable;
        }

        private async Task<VariableValue> SaveVariableValueAsync(
            Variable variable,
            SaveVariableValueRequest request,
            CancellationToken cancellationToken)
        {
            var value = new VariableValue
            {
                Id = request.ValueId ?? Guid.NewGuid(),
                Key = new VariableKey
                {
                    VariableId = request.VariableId,
                    ApplicationId = request.ApplicationId,
                    PartId = request.PartId,
                    EnvironmentId = request.EnvironmentId,
                }
            };

            if (variable.IsSecret)
            {
                ValueEncryptionResult encrypted = await _cryptoProvider.EncryptAsync(
                    request.Value,
                    cancellationToken);

                value.Value = encrypted.CipherValue;
                value.Encryption = encrypted.EncryptionInfo;
            }
            else
            {
                value.Value = request.Value;
            }

            await _variableValueStore.SaveAsync(value, cancellationToken);

            return value;
        }
    }
}
