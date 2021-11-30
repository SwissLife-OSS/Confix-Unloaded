using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate.Types.Relay;

namespace Confix.Authoring
{
    public interface IVariableService
    {
        Task<Variable> CreateAsync(
            CreateVariableRequest request,
            CancellationToken cancellationToken);

        Task<Variable> DeleteValueAsync(Guid id, CancellationToken cancellationToken);
        Task<IEnumerable<Variable>> GetAllAsync(CancellationToken cancellationToken);

        IQueryable<Variable> SearchVariables(string? search);

        Task<Variable> GetByIdAsync(Guid id, CancellationToken cancellationToken);

        Task<IEnumerable<Variable>> GetManyAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken);

        Task<IEnumerable<VariableValue>> GetValuesAsync(
            GetVariableValuesRequest request,
            CancellationToken cancellationToken);

        Task<IEnumerable<VariableValue>> GetValuesByApplicationPartAsync(
            Guid applicationPartId,
            CancellationToken cancellationToken);

        Task<IEnumerable<VariableValue>> GetValuesAsync(
            Variable variable,
            GetVariableValuesRequest request,
            CancellationToken cancellationToken);

        Task<VariableValue> SaveValueAsync(
            SaveVariableValueRequest request,
            CancellationToken cancellationToken);

        Task<Variable> RenameAsync(
            Guid id,
            string name,
            CancellationToken cancellationToken);
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
        string CipherValue);

    public record CreateVariableRequest(string Name, bool IsSecret)
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
