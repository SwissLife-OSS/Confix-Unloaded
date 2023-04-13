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
            
    public bool HasPermission(string @namespace, Scope scope, Permissions permission)
    {
        var grant = new Grant(@namespace, scope, permission);

        return _grantCache.GetOrAdd(grant, _ => HasPermissionCheck());

        bool HasPermissionCheck()
        {
            foreach (var group in Groups)
            {
                foreach (var roleScope in group.Roles)
                {
                    if (roleScope.Namespace != @namespace &&
                        roleScope.Namespace is not WellKnownNamespaces.Global)
                    {
                        continue;
                    }

                    foreach (var roleId in roleScope.RoleIds)
                    {
                        if (!_roleMap.TryGetValue(roleId, out var role))
                        {
                            continue;
                        }

                        foreach (var rolePermission in role.Permissions)
                        {
                            if (rolePermission.Scope != scope)
                            {
                                continue;
                            }

                            if (rolePermission.Permissions.HasFlag(permission))
                            {
                                return true;
                            }
                        }
                    }
                }
            }

            return false;
        }
    }
    private readonly record struct Grant(string Namespace, Scope Scope, Permissions Permission);
}
