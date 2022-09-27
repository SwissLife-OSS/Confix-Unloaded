namespace Confix.Authentication.Authorization;

[Flags]
public enum Permissions
{
    Read = 1,
    Write = 2,
    Manage = 4,
    Publish = 8,
    Decrypt = 16,
}

public enum Scope
{
    Configuration,
    Application,
    Variable,
    Identity,
    Component,
    Environment,
}
