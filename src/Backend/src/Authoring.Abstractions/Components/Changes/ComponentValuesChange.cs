using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.Changes;

public sealed class ComponentValuesChange : IComponentChange
{
    public ComponentValuesChange(Guid componentId, int componentVersion, string values)
    {
        ComponentId = componentId;
        ComponentVersion = componentVersion;
        Values = values;
    }

    public string Values { get; init; }

    public string Kind => nameof(ComponentValuesChange);

    [GraphQLName("component")]
    [UseDataLoader(typeof(IComponentDataLoader))]
    public Guid ComponentId { get; init; }

    public int ComponentVersion { get; init; }
}
