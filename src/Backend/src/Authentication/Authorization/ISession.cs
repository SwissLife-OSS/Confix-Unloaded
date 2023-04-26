namespace Confix.Authentication.Authorization;

public interface ISession
{
    IReadOnlyList<Group> Groups { get; }

    UserInfo UserInfo { get; }

    IReadOnlySet<string> Namespaces { get; }

    IReadOnlySet<string> NamespacesWithAccess(Scope scope, Permissions permission);

    bool HasPermission(string @namespace, Scope scope, Permissions permission);
}
