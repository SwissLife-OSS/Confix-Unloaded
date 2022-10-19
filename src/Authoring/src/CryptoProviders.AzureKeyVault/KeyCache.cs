using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Confix.CryptoProviders.AzureKeyVault;

internal sealed class KeyCache : IKeyCache
{
    private readonly ConcurrentDictionary<string, KeyHolder> _keys = new();

    public async ValueTask<byte[]> GetOrCreateAsync(
        string topic,
        Func<Task<byte[]>> fetchKey)
    {
        KeyHolder holder = _keys.GetOrAdd(topic, (id) => new KeyHolder(fetchKey()));
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

        public KeyHolder(Task<byte[]> loader)
        {
            _loader = loader;
        }

        private byte[]? _key = null;

        public async ValueTask<byte[]> GetKeyAsync()
        {
            if (_key is null)
            {
                _key = await _loader;
            }
            return _key;
        }
    }
}
