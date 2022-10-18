using HotChocolate.Types.Relay;

namespace Confix.Authentication.Authorization;

public record RoleScope(
    string Namespace,
    [property: ID(nameof(Role))] IReadOnlyCollection<Guid> RoleIds);
