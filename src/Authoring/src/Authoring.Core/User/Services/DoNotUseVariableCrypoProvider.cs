using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Confix.Authoring;

public class DoNotUseVariableCrypoProvider : IVariableCryptoProvider
{
    public Task<string> DecryptAsync(
        string encryptedValue,
        VariableEncryptionInfo encryptionInfo,
        CancellationToken cancellationToken)
    {
        return Task.FromResult(new string(encryptedValue.Reverse().ToArray()));
    }

    public Task<ValueEncryptionResult> EncryptAsync(
        string value,
        CancellationToken cancellationToken)
    {
        var result = new ValueEncryptionResult(
            new VariableEncryptionInfo("UNSAFE", "DEFAULT", "REVERSE"),
            new string(value.Reverse().ToArray()));

        return Task.FromResult(result);
    }
}
