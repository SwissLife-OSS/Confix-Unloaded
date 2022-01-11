using System;
using HotChocolate.Types.Relay;

namespace Confix.Authoring;

public record VariableValue
{
    public VariableValue(
        Guid id,
        VariableKey key,
        string value,
        VariableEncryptionInfo? encryption,
        int version)
    {
        Id = id;
        Key = key;
        Value = value;
        Encryption = encryption;
        Version = version;
    }

    [ID]
    public Guid Id { get; init; }

    public VariableKey Key { get; init; }

    public string Value { get; init; }

    public VariableEncryptionInfo? Encryption { get; init; }

    public int Version { get; init; }
}
