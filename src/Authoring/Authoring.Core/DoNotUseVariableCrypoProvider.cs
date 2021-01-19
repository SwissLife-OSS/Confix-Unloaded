using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Confix.Authoring
{
    public class DoNotUseVariableCrypoProvider : IVariableCryptoProvider
    {
        public Task<string> DescryptAsync(string encryptedValue, CancellationToken cancellationToken)
        {
            return Task.FromResult(encryptedValue.Reverse().ToString()!);
        }

        public Task<ValueEncryptionResult> EncryptAsync(string value, CancellationToken cancellationToken)
        {
            var result = new ValueEncryptionResult(new VariableEncryptionInfo
            {
                KeyProvider = "UNSAFE",
                Key = "DEFAULT",
                Algorithm = "REVERSE"
            }, value.Reverse().ToString()!);

            return Task.FromResult(result);
        }
    }
}
