using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.Changes;

public sealed class ComponentSchemaChange : IComponentChange
{
    public ComponentSchemaChange(Guid componentId, int componentVersion, string schema, string values)
    {
        ComponentId = componentId;
        ComponentVersion = componentVersion;
        Schema = schema;
        Values = values;
    }

    public string Schema { get; init; }
    public string Values { get; init; }

    public string Kind => nameof(ComponentSchemaChange);

    [GraphQLName("component")]
    [UseDataLoader(typeof(IComponentDataLoader))]
    public Guid ComponentId { get; init; }

    public int ComponentVersion { get; init; }
}
