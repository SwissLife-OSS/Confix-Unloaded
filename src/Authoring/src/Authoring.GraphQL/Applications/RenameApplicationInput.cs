using System;
using Confix.Authoring.Store;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Applications
{
    public record RenameApplicationInput(
        [property: ID(nameof(Application))] Guid Id,
        string Name);
}
