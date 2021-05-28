using System;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Components
{
    public record UpdateComponentSchemaInput(
        [ID(nameof(Component))] Guid Id,
        string Schema);
}
