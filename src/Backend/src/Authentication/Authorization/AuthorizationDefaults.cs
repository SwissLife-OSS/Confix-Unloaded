using System.Collections.Immutable;

namespace Confix.Authentication.Authorization;

public static class AuthorizationDefaults
{
    public static IReadOnlyList<Group> DefaultGroups { get; } = new[]
    {
        new Group(
            Guid.Parse("21088B78-F178-4AFC-8847-85801618B3E2"),
            "Default",
            ImmutableHashSet<Requirement>.Empty,
            ImmutableHashSet.Create(new RoleScope(WellKnownNamespaces.Global,
                new[] { Guid.Parse("63C30F32-DEB1-4DFC-8D19-CD7767CE5A20") })))
    };

    public static IReadOnlyList<Role> DefaultRoles { get; } = new[]
    {
        new Role(
            Guid.Parse("63C30F32-DEB1-4DFC-8D19-CD7767CE5A20"),
            "Default",
            new[] { new Permission(Scope.Environment, Permissions.Read) })
    };
}
