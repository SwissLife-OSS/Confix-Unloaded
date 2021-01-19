using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;

namespace Confix.Authoring
{
    public class VariableService : IVariableService
    {
        private readonly IVariableStore _variableStore;
        private readonly IVariableCryptoProvider _cryptoProvider;

        public VariableService(
            IVariableStore variableStore,
            IVariableCryptoProvider cryptoProvider)
        {
            _variableStore = variableStore;
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
                Namespace = request.Namespace
            };

            await _variableStore.AddAsync(variable, cancellationToken);

            if (request.DefaultValue != null)
            {
                await SaveVariableValueAsync(
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

        public async Task SaveVariableValueAsync(
            SaveVariableValueRequest request,
            CancellationToken cancellationToken)
        {
            Variable variable = await GetByIdAsync(request.VariableId, cancellationToken);

            var value = new VariableValue
            {
                VariableId = request.VariableId,
                ApplicationId = request.AppliationId,
                PartId = request.PartId,
                EnvionmentId = request.EnvironmentId,
            };

            if (request.ValueId.HasValue)
            {
                value.Id = request.ValueId.Value;
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
        }
    }
}
