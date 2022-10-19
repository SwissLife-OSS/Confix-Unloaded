namespace Confix.Authentication.Authorization;

public interface ISession
{
    string Sub { get; }

    string Name { get; }

    IReadOnlySet<string> Namespaces { get; }

    IReadOnlyList<Group> Groups { get; }

    UserInfo UserInfo { get; }

    bool HasPermission(string @namespace, Scope scope, Permissions permission);
}