using System;
using System.Collections.Generic;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Applications
{
    public record UpdateApplicationPartComponentValuesInput(
        [property: ID(nameof(Component))] Guid PartComponentId,
        [property: GraphQLType(typeof(AnyType))] IDictionary<string, object?> Values);
}
