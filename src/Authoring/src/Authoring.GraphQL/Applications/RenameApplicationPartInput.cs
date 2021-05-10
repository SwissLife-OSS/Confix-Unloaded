using System;
using Confix.Authoring.Store;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Applications
{
    public record RenameApplicationPartInput(
        [ID(nameof(Application))] Guid ApplicationId,
        [ID(nameof(ApplicationPart))] Guid Id,
        string Name);
}
