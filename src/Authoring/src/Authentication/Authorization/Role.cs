namespace Confix.Authentication.Authorization;

public record Role(Guid Id, string Name, IReadOnlyList<Permission> Permissions);

public record Permission(Scope Scope, Permissions Permissions);
