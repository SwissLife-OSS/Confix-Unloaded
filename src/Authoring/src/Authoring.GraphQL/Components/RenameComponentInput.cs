using System;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Components
{
    public record RenameComponentInput(
        [property: ID(nameof(Component))] Guid Id,
        string Name);
}
