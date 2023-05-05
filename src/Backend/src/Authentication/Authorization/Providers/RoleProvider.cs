using Microsoft.Extensions.Caching.Memory;

namespace Confix.Authentication.Authorization;

internal class RoleProvider : IRoleProvider
{
    private readonly TimeSpan _cacheExpiration = TimeSpan.FromMinutes(15);
    private readonly SemaphoreSlim _roleCacheSemaphore = new(1, 1);

    private readonly IMemoryCache _cache;
    private readonly IRoleStore _roleStore;

    public RoleProvider(IMemoryCache cache, IRoleStore roleStore)
    {
        _cache = cache;
        _roleStore = roleStore;
    }

    public async ValueTask<IReadOnlyDictionary<Guid, Role>> GetRoleMapAsync(
        CancellationToken cancellationToken)
    {
        const string cacheKey = "role_service.role_map";
        if (_cache.TryGetValue(cacheKey, out IReadOnlyDictionary<Guid, Role>? cachedRoles))
        {
            return cachedRoles!;
        }

        await _roleCacheSemaphore.WaitAsync(cancellationToken);
        try
        {
            cachedRoles = await _cache.GetOrCreateAsync(
                cacheKey,
                async cacheEntry =>
                {
                    cacheEntry.AbsoluteExpirationRelativeToNow = _cacheExpiration;
                    var roles = await _roleStore.GetAllAsync(cancellationToken);
                    return roles.ToDictionary(r => r.Id);
                });
        }
        finally
        {
            _roleCacheSemaphore.Release();
        }

        return cachedRoles!;
    }
}
