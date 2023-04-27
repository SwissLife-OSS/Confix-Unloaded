namespace Confix.Authentication.Authorization;

public interface ISession
{
    IReadOnlyList<Group> Groups { get; }

    UserInfo UserInfo { get; }

    IReadOnlySet<string> NamespacesWithAccess(Scope scope, Permissions permission);
    IReadOnlySet<Grant> GetGrantsForScope(Scope scope);
    bool HasPermission(string @namespace, Scope scope, Permissions permission);
}

public readonly record struct Grant(string Namespace, Scope Scope, Permissions Permission);
