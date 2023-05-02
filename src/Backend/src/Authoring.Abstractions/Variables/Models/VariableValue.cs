using Confix.CryptoProviders;
using HotChocolate;
using HotChocolate.Types.Relay;

namespace Confix.Authoring;

public sealed record VariableValue
{
    public VariableValue(
        Guid id,
        VariableValueScope scope,
        EncryptedValue encryptionValue,
        int version)
    {
        Id = id;
        Scope = scope;
        EncryptedValue = encryptionValue;
        Version = version;
    }

    [ID]
    public Guid Id { get; init; }

    [GraphQLIgnore]
    public Guid VariableId { get; init; }

    [GraphQLIgnore]
    public VariableValueScope Scope { get; init; }

    [GraphQLIgnore]
    public EncryptedValue EncryptedValue { get; init; }

    public int Version { get; init; }
}
