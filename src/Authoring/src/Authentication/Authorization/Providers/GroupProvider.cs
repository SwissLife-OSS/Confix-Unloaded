using System.Security.Authentication;
using System.Security.Claims;
using IdentityModel;
using Microsoft.Extensions.Caching.Memory;

namespace Confix.Authentication.Authorization;

public class GroupProvider
    : IGroupProvider
{
    private readonly TimeSpan _cacheExpiration = TimeSpan.FromMinutes(15);
    private readonly IMemoryCache _cache;
    private readonly IGroupStore _groupStore;
    private readonly object _groupLock = new();
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
        var sub = principal.FindFirstValue(JwtClaimTypes.Subject);
        if (sub is null)
        {
            throw new AuthenticationException("Sub was not provided");
        }

        string cacheKey = $"group_service.groups_of_user.{sub}";

        if (!_cache.TryGetValue(cacheKey, out Func<IReadOnlyList<Group>> cachedGroups))
        {
            var groups = await GetGroupsAsync(cancellationToken);

            lock (_userLock)
            {
                if (!_cache.TryGetValue(cacheKey, out cachedGroups))
                {
                    // capture the groups outside of the lambda scope
                    IReadOnlyList<Group>? groupsOfUser = null;
                    cachedGroups = () =>
                    {
                        groupsOfUser ??= groups
                            .Where(x => x.Requirements.Any(r => r.Validate(principal)))
                            .ToList();

                        return groupsOfUser;
                    };
                    var entry = _cache.CreateEntry(cacheKey);
                    entry.AbsoluteExpirationRelativeToNow = _cacheExpiration;
                    entry.Value = cachedGroups;
                }
            }
        }

        return cachedGroups();
    }

    private async Task<IReadOnlyList<Group>> GetGroupsAsync(CancellationToken cancellationToken)
    {
        const string cacheKey = "group_service.groups";

        if (!_cache.TryGetValue(cacheKey, out Task<IReadOnlyList<Group>> cachedGroups))
        {
            lock (_groupLock)
            {
                if (!_cache.TryGetValue(cacheKey, out cachedGroups))
                {
                    cachedGroups = _groupStore.GetAllAsync(cancellationToken);
                    var entry = _cache.CreateEntry(cacheKey);
                    entry.AbsoluteExpirationRelativeToNow = _cacheExpiration;
                    entry.Value = cachedGroups;

                    // reset roles because they might have changed
                    _cache.Remove(RoleProvider.CacheKey);
                }
            }
        }

        return await cachedGroups;
    }
}
