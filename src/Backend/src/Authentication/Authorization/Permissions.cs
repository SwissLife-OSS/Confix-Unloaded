namespace Confix.Authentication.Authorization;

[Flags]
public enum Permissions
{
    Read = 1,
    Write = 2,
    Claim = 4,
    Publish = 8,
    Decrypt = 16
}
