using System.Collections.Generic;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL.Components
{
    public record CreateComponentInput(
        string Name,
        [property:DefaultValue("type Component { text: String! }")]
        string Schema,
        [property: GraphQLType(typeof(AnyType))] Dictionary<string, object?>? Values);
}
