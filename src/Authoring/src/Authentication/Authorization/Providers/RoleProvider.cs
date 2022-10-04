using Microsoft.Extensions.Caching.Memory;

namespace Confix.Authentication.Authorization;

public class RoleProvider
    : IRoleProvider
{
    internal const string CacheKey = "role_service.role_map";
    private readonly TimeSpan _cacheExpiration = TimeSpan.FromMinutes(15);
    private readonly IMemoryCache _cache;
    private readonly IRoleStore _roleStore;
    private readonly object _roleLock = new();

    public RoleProvider(IMemoryCache cache, IRoleStore roleStore)
    {
        _cache = cache;
        _roleStore = roleStore;
    }

    public async ValueTask<IReadOnlyDictionary<Guid, Role>> GetRoleMapAsync(
        CancellationToken cancellationToken)
    {
        if (!_cache.TryGetValue(CacheKey, out CacheEntry cacheEntry))
        {
            lock (_roleLock)
            {
                if (!_cache.TryGetValue(CacheKey, out cacheEntry))
                {
                    cacheEntry = new CacheEntry(GetRoleMap(cancellationToken));
                    var entry = _cache.CreateEntry(CacheKey);
                    entry.AbsoluteExpirationRelativeToNow = _cacheExpiration;
                    entry.Value = cacheEntry;
                }
            }
        }

        try
        {
            return await cacheEntry.Get();
        }
        catch
        {
            _cache.Remove(CacheKey);
            throw;
        }
    }

    private async Task<IReadOnlyDictionary<Guid, Role>> GetRoleMap(
        CancellationToken cancellationToken)
    {
        var roles = await _roleStore.GetAllAsync(cancellationToken);

        return roles.ToDictionary(x => x.Id);
    }

    private struct CacheEntry
    {
        private readonly Task<IReadOnlyDictionary<Guid, Role>> _task;

        private IReadOnlyDictionary<Guid, Role>? _result;

        public CacheEntry(Task<IReadOnlyDictionary<Guid, Role>> task)
        {
            _task = task;
        }

        public async ValueTask<IReadOnlyDictionary<Guid, Role>> Get()
        {
            if (_result is not null)
            {
                return _result;
            }

            _result = await _task;

            return _result;
        }
    }
}
