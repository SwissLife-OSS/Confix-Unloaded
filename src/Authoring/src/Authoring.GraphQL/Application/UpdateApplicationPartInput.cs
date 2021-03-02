using System;
using System.Collections.Generic;
using Confix.Authoring.Store;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL
{
    public record UpdateApplicationPartInput(
        [ID(nameof(ApplicationPart))] Guid PartId,
        [ID(nameof(Application))] Guid ApplicationId,
        [ID(nameof(Component))] IReadOnlyList<Guid> Components,
        string Name);
}
