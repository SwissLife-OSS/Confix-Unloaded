using System;
using Confix.CryptoProviders;
using HotChocolate;
using HotChocolate.Types.Relay;

namespace Confix.Authoring;

public record VariableValue
{
    public VariableValue(
        Guid id,
        VariableKey key,
        string? value,
        EncryptedValue? encryptionValue,
        int version)
    {
        Id = id;
        Key = key;
        Value = value;
        EncryptedValue = encryptionValue;
        Version = version;
    }

    [ID]
    public Guid Id { get; init; }

    public VariableKey Key { get; init; }

    public string? Value { get; init; }

    [GraphQLIgnore]
    public EncryptedValue? EncryptedValue { get; init; }

    public int Version { get; init; }
}
