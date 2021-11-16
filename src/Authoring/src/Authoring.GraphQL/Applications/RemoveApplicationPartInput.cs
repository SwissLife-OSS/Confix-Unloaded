using System;
using Confix.Authoring.Store;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Applications
{
    public record RemoveApplicationPartInput(
        [property: ID(nameof(ApplicationPart))] Guid ApplicationPartId);
}
