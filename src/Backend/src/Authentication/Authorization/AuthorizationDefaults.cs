using System.Collections.Immutable;

namespace Confix.Authentication.Authorization;

public static class AuthorizationDefaults
{
    public static IReadOnlyList<Group> DefaultGroups { get; } = new[]
    {
        new Group(Guid.Parse("21088B78-F178-4AFC-8847-85801618B3E2"),
            "Default",
            ImmutableHashSet<Requirement>.Empty,
            ImmutableHashSet.Create(new RoleScope(WellKnownNamespaces.Global,
                new[] { Guid.Parse("63C30F32-DEB1-4DFC-8D19-CD7767CE5A20") }))),
        new Group(
            Guid.Parse("76C6CBA7-A71B-4653-BDBA-61BA4C3D335C"),
            "Tooling - Claim",
            ImmutableHashSet.Create<Requirement>(
                new ClaimRequirement("scope", Scopes.ConfigurationClaim)),
            ImmutableHashSet.Create(
                new RoleScope(
                    WellKnownNamespaces.Global,
                    new[] { Guid.Parse("079AD2AD-FDCD-41E2-B33F-298654C6FC77"), })))
    };

    public static IReadOnlyList<Role> DefaultRoles { get; } = new[]
    {
        new Role(Guid.Parse("63C30F32-DEB1-4DFC-8D19-CD7767CE5A20"),
            "Default",
            new[] { new Permission(Scope.Environment, Permissions.Read) }),
        new Role(
            Guid.Parse("079AD2AD-FDCD-41E2-B33F-298654C6FC77"),
            "Tooling - Claim",
            new List<Permission> { new(Scope.Application, Permissions.Claim) })
    };
}
