using System.Collections.Generic;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL.Components
{
    public record CreateComponentInput(
        string Name,
        [DefaultValue("type Component { text: String! }")]
        string Schema,
        [GraphQLType(typeof(AnyType))] Dictionary<string, object?>? Values);
}
