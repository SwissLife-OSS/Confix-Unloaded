using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Confix.Authoring
{
    public interface IVariableService
    {
        Task<Variable> AddAsync(AddVariableRequest request, CancellationToken cancellationToken);

        Task<IEnumerable<Variable>> GetAllAsync(CancellationToken cancellationToken);

        Task<Variable> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    }

    public interface IVariableCryptoProvider
    {
        Task<ValueEncryptionResult> EncryptAsync(
            string value,
            CancellationToken cancellationToken);

        Task<string> DescryptAsync(string encryptedValue, CancellationToken cancellationToken);
    }

    public record ValueEncryptionResult(
        VariableEncryptionInfo EncryptionInfo,
        string EncryptedValue);

    public record AddVariableRequest(string Name)
    {
        public string? Namespace { get; init; }

        public string? DefaultValue { get; set; }
    }

    public record SaveVariableValueRequest(Guid VariableId, string Value)
    {
        public Guid? ValueId { get; init; }

        public Guid? AppliationId { get; init; }

        public Guid? PartId { get; init; }

        public Guid? EnvironmentId { get; init; }
    }
}
