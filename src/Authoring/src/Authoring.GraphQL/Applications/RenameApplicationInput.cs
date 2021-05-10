using System;
using Confix.Authoring.Store;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Applications
{
    public record RenameApplicationInput(
        [ID(nameof(Application))] Guid Id,
        string Name);
}
