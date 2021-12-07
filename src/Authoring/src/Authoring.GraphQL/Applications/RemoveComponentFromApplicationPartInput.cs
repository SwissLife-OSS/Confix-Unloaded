using System;
using Confix.Authoring.Store;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Applications
{
    public record RemoveComponentFromApplicationPartInput(
        [property: ID(nameof(ApplicationPartComponent))] Guid PartComponentId);
}
