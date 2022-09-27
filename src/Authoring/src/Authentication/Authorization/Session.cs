using System.Collections.Concurrent;

namespace Confix.Authentication.Authorization;

public class Session : ISession
{
    private readonly IReadOnlyList<Group> _groups;

    private readonly IReadOnlyDictionary<Guid, Role> _roleMap;

    private readonly ConcurrentDictionary<Grant, bool> _cache = new();

    private IReadOnlySet<string>? _namespaces;

    private UserInfo? _userInfo;


    public Session(
        string sub,
        IReadOnlyList<Group> groups,
        IReadOnlyDictionary<Guid, Role> roleMap)
    {
        Sub = sub;
        _groups = groups;
        _roleMap = roleMap;
    }

    public string Sub { get; }

    public string Name => Sub;

    public UserInfo UserInfo
    {
        get
        {
            _userInfo = new UserInfo { Email = Sub };
            return _userInfo;
        }
    }

    public bool HasPermission(string @namespace, Scope scope, Permissions permission)
    {
        var grant = new Grant(@namespace, scope, permission);

        return _cache.GetOrAdd(grant, _ => HasPermissionCheck());

        bool HasPermissionCheck()
        {
            foreach (var group in _groups)
            {
                foreach (var roleScope in group.Roles)
                {
                    if (roleScope.Namespace != @namespace)
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

                            return rolePermission.Permissions.HasFlag(permission);
                        }
                    }
                }
            }

            return false;
        }
    }

    public IReadOnlySet<string> Namespaces
    {
        get
        {
            _namespaces ??= _groups.SelectMany(x => x.Roles).Select(x => x.Namespace).ToHashSet();
            return _namespaces;
        }
    }

    private readonly record struct Grant(string @namespace, Scope scope, Permissions permission);
}
