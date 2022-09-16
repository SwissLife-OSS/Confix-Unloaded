namespace Confix.Authentication.Authorization;

public record Group(
    Guid Id,
    string Name,
    IReadOnlySet<Requirement> Requirements,
    IReadOnlySet<RoleScope> Roles);
