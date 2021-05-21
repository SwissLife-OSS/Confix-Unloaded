using System;
using System.Collections.Generic;
using Confix.Authoring.Store;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Applications
{
    public record AddComponentsToApplicationPartInput(
        [ID(nameof(ApplicationPart))] Guid ApplicationPartId,
        [ID(nameof(Component))] IReadOnlyList<Guid> ComponentIds);
}
