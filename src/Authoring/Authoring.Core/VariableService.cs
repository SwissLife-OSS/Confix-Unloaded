using System;
using System.Collections.Generic;
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

        public async Task<Variable> AddAsync(
            AddVariableRequest request,
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

            await _variableStore.AddAsync(variable, cancellationToken);

            if (request.DefaultValue != null)
            {
                await SaveVariableValueAsync(
                    variable,
                    new SaveVariableValueRequest(variable.Id, request.DefaultValue),
                    cancellationToken);
            }

            return variable;
        }

        public async Task<IEnumerable<Variable>> GetAllAsync(
            CancellationToken cancellationToken)
        {
            return await _variableStore.GetAllAsync(cancellationToken);
        }

        public async Task<Variable> GetByIdAsync(
            Guid id,
            CancellationToken cancellationToken)
        {
            return await _variableStore.GetByIdAsync(id, cancellationToken);
        }

        public async Task<Variable> SaveVariableValueAsync(
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
            Variable variable = await _variableStore.GetByIdAsync(request.Filter.Id, cancellationToken);

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
                        value.Encryption,
                        cancellationToken);
                }
            }

            return values;
        }

        private async Task<Variable> SaveVariableValueAsync(
            Variable variable,
            SaveVariableValueRequest request,
            CancellationToken cancellationToken)
        {
            var value = new VariableValue
            {
                VariableId = request.VariableId,
                ApplicationId = request.ApplicationId,
                PartId = request.PartId,
                EnvionmentId = request.EnvironmentId,
            };

            if (request.ValueId.HasValue)
            {
                value.Id = request.ValueId.Value;
            }
            else
            {
                value.Id = Guid.NewGuid();
            }

            if (variable.IsSecret)
            {
                ValueEncryptionResult encrypted = await _cryptoProvider.EncryptAsync(
                    request.Value,
                    cancellationToken);

                value.Value = encrypted.EncryptedValue;
                value.Encryption = encrypted.EncryptionInfo;
            }
            else
            {
                value.Value = request.Value;
            }

            await _variableValueStore.SaveAsync(value, cancellationToken);

            return variable;
        }
    }
}
