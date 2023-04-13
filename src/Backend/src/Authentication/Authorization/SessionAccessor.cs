using System.Collections.Immutable;
using System.Security.Authentication;
using System.Security.Claims;
using Confix.Authentication.ApiKey;
using IdentityModel;
using Microsoft.AspNetCore.Http;

namespace Confix.Authentication.Authorization;

public class SessionAccessor : ISessionAccessor
{
    private readonly IHttpContextAccessor _accessor;
    private readonly IGroupProvider _groupProvider;
    private readonly IApiKeyProvider _apiKeyProvider;
    private readonly IRoleProvider _roleProvider;
    private Lazy<Task<ISession?>>? lazySession;
    private readonly object sessionLock = new();

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
        if (lazySession is null)
        {
            lock (sessionLock)
            {
                lazySession ??= new (() => CreateSession(cancellationToken), true);
            }
        }

        return await lazySession.Value.WaitAsync(cancellationToken);
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
        UserInfo userInfo = GetUserInfo(user);

        var groups = await groupsTask;
        if (!groups.Any())
        {
            return null;
        }

        return new Session(
            userInfo,
            groups,
            await roleMapTask);
    }

    private UserInfo GetUserInfo(ClaimsPrincipal user)
    {
        string? sub = user.FirstExisting(
            JwtClaimTypes.Subject,
            ClaimTypes.NameIdentifier,
            JwtClaimTypes.JwtId);

        if (sub is null)
        {
            throw new AuthenticationException("Sub was not provided");
        }

        string name = user.FirstExisting(
            JwtClaimTypes.Name,
            JwtClaimTypes.PreferredUserName,
            JwtClaimTypes.GivenName) ?? sub;
        string? email = user.FirstExisting(
            JwtClaimTypes.Email,
            ClaimTypes.Upn,
            JwtClaimTypes.PreferredUserName,
            "upn");

        return new(sub, name, email);
    }

    private async Task<IReadOnlyList<Group>> GetGroupsAsync(
        ClaimsPrincipal user,
        CancellationToken cancellationToken)
    {
        if (user.Claims.FirstOrDefault(x => x.Type == ApiKeyDefaults.ApiKeyClaim) is
            { } apiKeyClaim)
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

file static class Extensions
{
    public static string? FirstExisting(this ClaimsPrincipal claimsPrincipal, params string[] claims)
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
