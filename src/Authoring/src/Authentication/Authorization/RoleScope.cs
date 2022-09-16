namespace Confix.Authentication.Authorization;

public record RoleScope(Guid Id, string Namespace, IReadOnlyCollection<Guid> RoleIds);
