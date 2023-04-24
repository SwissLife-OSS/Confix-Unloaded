using System.Collections.Concurrent;

namespace Confix.Authentication.Authorization;

public class Session : ISession
{
    private readonly ConcurrentDictionary<Grant, bool> _grantCache = new();
    private readonly IReadOnlyDictionary<Guid, Role> _roleMap;
    private IReadOnlySet<string>? _namespaces;

    public Session(UserInfo userInfo, IReadOnlyList<Group> groups, IReadOnlyDictionary<Guid, Role> roleMap)
    {
        UserInfo = userInfo;
        Groups = groups;
        _roleMap = roleMap;
    }

    public UserInfo UserInfo { get; }

    public IReadOnlyList<Group> Groups { get; }

    public IReadOnlySet<string> Namespaces => _namespaces
        ??= Groups
            .SelectMany(x => x.Roles)
            .Select(x => x.Namespace)
            .ToHashSet();

    public IReadOnlySet<string> NamespacesWithAccess(Scope scope, Permissions permission)
    {
        return Namespaces.AsParallel().Where(n => HasPermission(n, scope, permission)).ToHashSet();
    }

    public bool HasPermission(string @namespace, Scope scope, Permissions permission)
    {
        var grant = new Grant(@namespace, scope, permission);

        return _grantCache.GetOrAdd(grant, HasGrant);
    }

    private bool HasGrant(Grant grant) => Groups
        .SelectMany(group => group.Roles)
        .Where(roleScope => roleScope.Namespace == grant.Namespace || roleScope.Namespace is WellKnownNamespaces.Global)
        .SelectMany(roleScope => roleScope.RoleIds)
        .Select(roleId => _roleMap.GetValueOrDefault(roleId))
        .SelectMany(role => role?.Permissions ?? Array.Empty<Permission>())
        .Any(rolePermission => rolePermission.Scope == grant.Scope && rolePermission.Permissions.HasFlag(grant.Permission));

    private readonly record struct Grant(string Namespace, Scope Scope, Permissions Permission);
}
