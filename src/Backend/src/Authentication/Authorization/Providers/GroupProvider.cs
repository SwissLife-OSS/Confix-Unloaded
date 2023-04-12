using System.Security.Authentication;
using System.Security.Claims;
using IdentityModel;
using Microsoft.Extensions.Caching.Memory;

namespace Confix.Authentication.Authorization;

public class GroupProvider : IGroupProvider
{
    private readonly IMemoryCache _cache;
    private readonly TimeSpan _cacheExpiration = TimeSpan.FromMinutes(15);
    private static readonly SemaphoreSlim _groupSemaphore = new(1, 1);
    private readonly IGroupStore _groupStore;
    private readonly object _userLock = new();

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

        if (_cache.TryGetValue(cacheKey, out IReadOnlyList<Group> cachedGroups))
        {
            return cachedGroups;
        }

        var groups = await GetGroupsAsync(cancellationToken);

        lock (_userLock)
        {
            return _cache.GetOrCreate(cacheKey, (cacheEntry) =>
            {
                var groupsForUser = groups
                    .Where(x => x.Requirements.Any(r => r.Validate(principal)))
                    .Concat(AuthorizationDefaults.DefaultGroups)
                    .ToArray();
                cacheEntry.AbsoluteExpirationRelativeToNow = _cacheExpiration;
                return groupsForUser;
            });
        }
    }

    private async Task<IReadOnlyList<Group>> GetGroupsAsync(CancellationToken cancellationToken)
    {
        const string cacheKey = "group_service.groups";
        return await _cache.GetOrCreateAsync(cacheKey, async (cacheEntry) =>
        {
            await _groupSemaphore.WaitAsync();
            try
            {
                if (_cache.TryGetValue(cacheKey, out IReadOnlyList<Group> cachedResult))
                {
                    return cachedResult;
                }

                var resultFromStore = await _groupStore.GetAllAsync(cancellationToken);
                cacheEntry.AbsoluteExpirationRelativeToNow = _cacheExpiration;
                _cache.Remove(RoleProvider.CacheKey);
                return resultFromStore;
            }
            finally
            {
                _groupSemaphore.Release();
            }
        });
    }
}
