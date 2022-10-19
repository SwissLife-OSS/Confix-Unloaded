using HotChocolate.Types.Relay;

namespace Confix.Authentication.Authorization;

public record Role([property: ID] Guid Id, string Name, IReadOnlyList<Permission> Permissions);
