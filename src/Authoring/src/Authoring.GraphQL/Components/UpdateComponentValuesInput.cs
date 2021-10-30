using System;
using System.Collections.Generic;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Components
{
    public record UpdateComponentValuesInput(
        [property:ID(nameof(Component))] Guid Id,
        [property: GraphQLType(typeof(AnyType))] Dictionary<string, object?> Values);
}
