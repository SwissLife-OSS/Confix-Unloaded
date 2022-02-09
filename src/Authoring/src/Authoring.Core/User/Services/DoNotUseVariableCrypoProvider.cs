using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.CryptoProviders;

namespace Confix.Authoring;

public class DoNotUseVariableCrypoProvider : IEncryptor, IDecryptor
{
    public Task<string> DecryptAsync(EncryptedValue encryptedValue, CancellationToken cancellationToken)
    {
        return Task.FromResult(new string(encryptedValue.Value.Reverse().ToArray()));
    }

    public Task<EncryptedValue> EncryptAsync(
        string topic,
        string value,
        CancellationToken cancellationToken)
        => Task.FromResult(
            new EncryptedValue(
                new string(value.Reverse().ToArray()),
                "UNSAFE",
                "UNSAFE"));
}
