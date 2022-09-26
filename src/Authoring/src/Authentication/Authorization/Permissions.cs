namespace Confix.Authentication.Authorization;

[Flags]
public enum Permissions
{
    ReadConfiguration = 1,
    WriteConfiguration = 2,
    ManageApplications = 4,
    PublishApplicationParts = 8,
    ManageIdentity = 16,
    WriteComponents = 32,
    ReadComponents = 64,
    ManageEnvironments = 128,
    ReadVariables = 256,
    WriteVariables = 512,
    ReadVariableSecrets = 1024
}
