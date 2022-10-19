using System;
using System.Threading.Tasks;

namespace Confix.CryptoProviders.AzureKeyVault;

internal interface IKeyEncryptionKeyCache
{
    ValueTask<byte[]> GetOrCreateAsync(string topic, Func<Task<byte[]>> fetchKey);
}
