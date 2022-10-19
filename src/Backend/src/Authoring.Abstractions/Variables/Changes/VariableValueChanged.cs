using Confix.Authoring.Store;
using Confix.CryptoProviders;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.Variables.Changes;

public sealed class VariableValueChange : IVariableChange
{
    public VariableValueChange(
        Guid variableId,
        int variableVersion,
        VariableKey key,
        string? value,
        EncryptedValue? encryptedValue)
    {
        VariableId = variableId;
        VariableVersion = variableVersion;
        Key = key;
        Value = value;
        EncryptedValue = encryptedValue;
    }

    public VariableKey Key { get; init; }

    public string? Value { get; init; }

    public EncryptedValue? EncryptedValue { get; init; }

    [GraphQLName("variable")]
    [UseDataLoader(typeof(IVariableDataLoader))]
    public Guid VariableId { get; init; }

    public int VariableVersion { get; init; }

    public string Kind => nameof(VariableValueChange);
}
