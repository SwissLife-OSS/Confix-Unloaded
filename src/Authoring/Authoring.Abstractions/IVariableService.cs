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
        Task<IEnumerable<Variable>> GetManyAsync(IEnumerable<Guid> ids, CancellationToken cancellationToken);
        Task<IEnumerable<VariableValue>> GetValuesAsync(GetVariableValuesRequest request, CancellationToken cancellationToken);
        Task<IEnumerable<VariableValue>> GetValuesAsync(Variable variable, GetVariableValuesRequest request, CancellationToken cancellationToken);
        Task<VariableValue> SaveVariableValueAsync(SaveVariableValueRequest request, CancellationToken cancellationToken);
    }

    public interface IVariableCryptoProvider
    {
        Task<ValueEncryptionResult> EncryptAsync(
            string value,
            CancellationToken cancellationToken);

        Task<string> DecryptAsync(
            string encryptedValue,
            VariableEncryptionInfo encryptionInfo,
            CancellationToken cancellationToken);
    }

    public record ValueEncryptionResult(
        VariableEncryptionInfo EncryptionInfo,
        string EncryptedValue);

    public record AddVariableRequest(string Name, bool IsSecret)
    {
        public string? Namespace { get; init; }

        public string? DefaultValue { get; set; }
    }

    public record SaveVariableValueRequest(Guid VariableId, string Value)
    {
        public Guid? ValueId { get; init; }

        public Guid? ApplicationId { get; init; }

        public Guid? PartId { get; init; }

        public Guid? EnvironmentId { get; init; }
    }

    public record GetVariableValuesRequest(VariableValueFilter Filter)
    {
        public bool Decrypt { get; init; }
    }

    public record VariableValueFilter(Guid Id)
    {
        public Guid? EnvironmentId { get; init; }

        public Guid? ApplicationId { get; init; }

        public Guid? PartId { get; init; }
    }
}
