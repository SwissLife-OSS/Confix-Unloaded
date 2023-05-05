using System.Collections.Immutable;
using System.Security.Authentication;
using System.Security.Claims;
using Confix.Authentication.ApiKey;
using Microsoft.AspNetCore.Http;
using static Confix.Authentication.ApiKey.ApiKeyDefaults;
using static IdentityModel.JwtClaimTypes;

namespace Confix.Authentication.Authorization;

internal class SessionAccessor : ISessionAccessor
{
    private readonly IHttpContextAccessor _accessor;
    private readonly IGroupProvider _groupProvider;
    private readonly IApiKeyProvider _apiKeyProvider;
    private readonly IRoleProvider _roleProvider;
    private Lazy<Task<ISession?>>? _lazySession;
    private readonly object _sessionLock = new();

    public SessionAccessor(
        IHttpContextAccessor accessor,
        IGroupProvider groupProvider,
        IApiKeyProvider apiKeyProvider,
        IRoleProvider roleProvider)
    {
        _accessor = accessor;
        _groupProvider = groupProvider;
        _apiKeyProvider = apiKeyProvider;
        _roleProvider = roleProvider;
    }

    public async ValueTask<ISession?> GetSession(CancellationToken cancellationToken)
    {
        if (_lazySession is null)
        {
            lock (_sessionLock)
            {
                _lazySession ??= new(() => CreateSession(cancellationToken), true);
            }
        }

        return await _lazySession.Value.WaitAsync(cancellationToken);
    }

    private async Task<ISession?> CreateSession(CancellationToken cancellationToken)
    {
        var context = _accessor.HttpContext;

        if (context?.User is not { Identity.IsAuthenticated: true } user)
        {
            return null;
        }

        var groupsTask = GetGroupsAsync(user, cancellationToken);
        var roleMapTask = _roleProvider.GetRoleMapAsync(cancellationToken);
        var userInfo = GetUserInfo(user);

        var groups = await groupsTask;
        if (groups.Count == 0)
        {
            return null;
        }

        return new Session(userInfo, groups, await roleMapTask);
    }

    private static UserInfo GetUserInfo(ClaimsPrincipal user)
    {
        var sub = user.FirstExisting(Subject, ClaimTypes.NameIdentifier, JwtId);

        if (sub is null)
        {
            throw new AuthenticationException("Sub was not provided");
        }

        var name = user.FirstExisting(Name, PreferredUserName, GivenName) ?? sub;
        var email = user.FirstExisting(Email, ClaimTypes.Upn, PreferredUserName, "upn");

        return new(sub, name, email);
    }

    private async Task<IReadOnlyList<Group>> GetGroupsAsync(
        ClaimsPrincipal user,
        CancellationToken cancellationToken)
    {
        if (user.Claims.FirstOrDefault(x => x.Type == ApiKeyClaim) is { } apiKeyClaim)
        {
            var apiKey = await _apiKeyProvider
                .GetByIdAsync(Guid.Parse(apiKeyClaim.Value), cancellationToken);

            if (apiKey is null)
            {
                return Array.Empty<Group>();
            }

            return new[]
            {
                new Group(Guid.Empty,
                    "Api Key Auth",
                    ImmutableHashSet<Requirement>.Empty,
                    apiKey.Roles)
            };
        }

        return await _groupProvider.GetGroupsOfUserAsync(user, cancellationToken);
    }
}

static file class Extensions
{
    public static string? FirstExisting(
        this ClaimsPrincipal claimsPrincipal,
        params string[] claims)
    {
        foreach (string claim in claims)
        {
            if (claimsPrincipal.FindFirstValue(claim) is { } value)
            {
                return value;
            }
        }

        return null;
    }
}
