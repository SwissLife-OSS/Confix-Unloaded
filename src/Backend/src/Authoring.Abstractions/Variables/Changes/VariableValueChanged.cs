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
        VariableValueScope scope,
        Guid? environmentId,
        EncryptedValue? encryptedValue)
    {
        VariableId = variableId;
        VariableVersion = variableVersion;
        EncryptedValue = encryptedValue;
        EnvironmentId = environmentId;
        Scope = scope;
    }

    public VariableValueScope Scope { get; init; }

    public Guid? EnvironmentId { get; init; }

    public EncryptedValue? EncryptedValue { get; init; }

    [GraphQLName("variable")]
    [UseDataLoader(typeof(IVariableDataLoader))]
    public Guid VariableId { get; init; }

    public int VariableVersion { get; init; }

    public string Kind => nameof(VariableValueChange);
}
