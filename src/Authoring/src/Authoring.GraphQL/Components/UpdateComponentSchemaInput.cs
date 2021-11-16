using System;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Components
{
    public record UpdateComponentSchemaInput(
        [property:ID(nameof(Component))] Guid Id,
        string Schema);
}
