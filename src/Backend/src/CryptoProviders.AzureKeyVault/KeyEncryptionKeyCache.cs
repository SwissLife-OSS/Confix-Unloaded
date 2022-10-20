using System.Collections.Concurrent;

namespace Confix.CryptoProviders.AzureKeyVault;

internal sealed class KeyEncryptionKeyCache : IKeyEncryptionKeyCache
{
    private readonly ConcurrentDictionary<string, KeyHolder> _keys = new();

    public async ValueTask<byte[]> GetOrCreateAsync(string topic, Func<Task<byte[]>> fetchKey)
    {
        var holder = _keys.GetOrAdd(topic, _ => new KeyHolder(fetchKey()));

        try
        {
            return await holder.GetKeyAsync();
        }
        catch
        {
            _keys.Remove(topic, out _);

            throw;
        }
    }

    private class KeyHolder
    {
        private readonly Task<byte[]> _loader;

        private byte[]? _key;

        public KeyHolder(Task<byte[]> loader)
        {
            _loader = loader;
        }

        public async ValueTask<byte[]> GetKeyAsync()
        {
            return _key ??= await _loader;
        }
    }
}
