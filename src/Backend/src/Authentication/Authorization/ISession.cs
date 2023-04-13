namespace Confix.Authentication.Authorization;

public interface ISession
{
    IReadOnlySet<string> Namespaces { get; }

    IReadOnlyList<Group> Groups { get; }

    UserInfo UserInfo { get; }

    bool HasPermission(string @namespace, Scope scope, Permissions permission);
}
