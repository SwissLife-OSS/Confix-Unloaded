namespace Confix.Authentication.Authorization;

[Flags]
public enum Permissions
{
    ReadConfiguration = 1,
    WriteConfiguration = 2,
    ManageApplications = 4,
    PublishApplicationParts = 8,
    ManageIdentity = 16
}
