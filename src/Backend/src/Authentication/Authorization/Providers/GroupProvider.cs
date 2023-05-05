using System.Security.Authentication;
using System.Security.Claims;
using IdentityModel;
using Microsoft.Extensions.Caching.Memory;

namespace Confix.Authentication.Authorization;

internal class GroupProvider : IGroupProvider
{
    private readonly TimeSpan _cacheExpiration = TimeSpan.FromMinutes(15);

    private readonly object _userCacheLock = new();
    private readonly SemaphoreSlim _groupCacheSemaphore = new(1, 1);

    private readonly IMemoryCache _cache;
    private readonly IGroupStore _groupStore;

    public GroupProvider(IMemoryCache cache, IGroupStore groupStore)
    {
        _cache = cache;
        _groupStore = groupStore;
    }

    public async ValueTask<IReadOnlyList<Group>> GetGroupsOfUserAsync(
        ClaimsPrincipal principal,
        CancellationToken cancellationToken)
    {
        var identifier = principal.FindFirstValue(JwtClaimTypes.Subject) ??
            principal.FindFirstValue(ClaimTypes.NameIdentifier) ??
            principal.FindFirstValue(JwtClaimTypes.JwtId);

        if (identifier is null)
        {
            throw new AuthenticationException("Sub was not provided");
        }

        var cacheKey = $"group_service.groups_of_user.{identifier}";

        if (_cache.TryGetValue(cacheKey, out IReadOnlyList<Group>? cachedGroups))
        {
            return cachedGroups!;
        }

        var groups = await GetGroupsAsync(cancellationToken);

        lock (_userCacheLock)
        {
            cachedGroups = _cache.GetOrCreate(
                cacheKey,
                cacheEntry =>
                {
                    cacheEntry.AbsoluteExpirationRelativeToNow = _cacheExpiration;
                    return groups
                        .AsParallel()
                        .Where(x => x.Requirements.Any(r => r.Validate(principal)))
                        .ToArray();
                });
        }

        return cachedGroups!;
    }

    private async Task<IReadOnlyList<Group>> GetGroupsAsync(CancellationToken cancellationToken)
    {
        const string cacheKey = "group_service.groups";

        if (_cache.TryGetValue(cacheKey, out IReadOnlyList<Group>? cachedGroups))
        {
            return cachedGroups!;
        }

        await _groupCacheSemaphore.WaitAsync(cancellationToken);
        try
        {
            cachedGroups = await _cache.GetOrCreateAsync(cacheKey,
                async cacheEntry =>
                {
                    cacheEntry.AbsoluteExpirationRelativeToNow = _cacheExpiration;
                    return await _groupStore.GetAllAsync(cancellationToken);
                });
        }
        finally
        {
            _groupCacheSemaphore.Release();
        }

        return cachedGroups!;
    }
}
