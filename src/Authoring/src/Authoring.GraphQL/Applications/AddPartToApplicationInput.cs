using System;
using System.Collections.Generic;
using Confix.Authoring.Store;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Applications
{
    public record AddPartToApplicationInput(
        string PartName,
        [property: ID(nameof(Application))] Guid ApplicationId);
}
