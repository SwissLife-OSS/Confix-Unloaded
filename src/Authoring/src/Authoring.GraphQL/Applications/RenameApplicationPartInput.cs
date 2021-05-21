using System;
using Confix.Authoring.Store;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Applications
{
    /// <summary>
    /// Rename application part input data.
    /// </summary>
    /// <param name="ApplicationPartId">The application part ID</param>
    /// <param name="Name">The new name of the application part.</param>
    public record RenameApplicationPartInput(
        [ID(nameof(ApplicationPart))] Guid ApplicationPartId,
        string Name);
}
