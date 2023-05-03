using System.Collections.Concurrent;
using System.Collections.Immutable;

namespace Confix.Authentication.Authorization;

public class Session : ISession
{
    private readonly ConcurrentDictionary<Grant, bool> _grantCache = new();
    private readonly IReadOnlyDictionary<Guid, Role> _roleMap;
    private readonly Lazy<IReadOnlySet<string>> _namespaces;

    public Session(UserInfo userInfo, IReadOnlyList<Group> groups, IReadOnlyDictionary<Guid, Role> roleMap)
    {
        UserInfo = userInfo;
        Groups = groups;
        _roleMap = roleMap;
        _namespaces = new Lazy<IReadOnlySet<string>>(
            () => Groups
                .SelectMany(x => x.Roles)
                .Select(x => x.Namespace)
                .ToHashSet());
    }

    public UserInfo UserInfo { get; }

    public IReadOnlyList<Group> Groups { get; }

    public IReadOnlySet<string> GetNamespacesWithAccess(Scope scope, Permissions permission)
        => _namespaces.Value
            .Where(n => HasPermission(n, scope, permission))
            .ToHashSet();

    public bool HasPermission(string @namespace, Scope scope, Permissions permission)
        => _grantCache.GetOrAdd(new(@namespace, scope, permission), HasGrant);

    public IReadOnlySet<Grant> GetGrantsForScope(Scope scope)
    {
        IReadOnlySet<Grant> grantsForScope = Groups
            .SelectMany(g => g.Roles)
            .AsParallel()
            .SelectMany(roleScope => roleScope.RoleIds.Select(roleId => new
            {
                roleScope.Namespace,
                Role = _roleMap.GetValueOrDefault(roleId)
            }))
            .SelectMany(r => (r.Role?.Permissions ?? Array.Empty<Permission>())
                .Where(p => p.Scope == scope)
                .Select(p => new Grant(r.Namespace, scope, p.Permissions)))
            .GroupBy(g => g.Namespace)
            .Select(g => new Grant(
                g.Key,
                scope,
                g.Select(x => x.Permission).Aggregate((a, b) => a | b)
            ))
            .ToImmutableHashSet();

        _grantCache.AddMany(grantsForScope, true);

        return grantsForScope;
    }

    private bool HasGrant(Grant grant) => Groups
        .AsParallel()
        .SelectMany(group => group.Roles)
        .Where(roleScope => roleScope.Namespace == grant.Namespace || roleScope.Namespace is WellKnownNamespaces.Global)
        .SelectMany(roleScope => roleScope.RoleIds)
        .Select(roleId => _roleMap.GetValueOrDefault(roleId))
        .Any(role => role.GrantsPermissionFor(grant.Scope, grant.Permission));
}

file static class Extensions
{
    public static bool GrantsPermissionFor(
        this Role? role,
        Scope scope,
        Permissions permission)
        => role?.Permissions.Any(rolePermission =>
            rolePermission.Scope == scope
            && rolePermission.Permissions.HasFlag(permission)) ?? false;

    public static void AddMany<TKey, TValue>(
        this IDictionary<TKey, TValue> dictionary,
        IEnumerable<TKey> keys,
        TValue value)
    {
        foreach (var item in keys)
        {
            dictionary.TryAdd(item, value);
        }
    }
}
