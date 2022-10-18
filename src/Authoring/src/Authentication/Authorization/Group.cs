using System.Collections.Immutable;
using HotChocolate.Types.Relay;

namespace Confix.Authentication.Authorization;

public record Group(
    [property: ID] Guid Id,
    string Name,
    ImmutableHashSet<Requirement> Requirements,
    ImmutableHashSet<RoleScope> Roles);
