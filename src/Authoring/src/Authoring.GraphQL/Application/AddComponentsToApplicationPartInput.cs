using System;
using System.Collections.Generic;
using Confix.Authoring.Store;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL
{
    public record AddComponentsToApplicationPartInput(
        [ID(nameof(ApplicationPart))] Guid Id,
        [ID(nameof(Application))] Guid ApplicationId,
        [ID(nameof(Component))] IReadOnlyList<Guid> ComponentIds);
}
