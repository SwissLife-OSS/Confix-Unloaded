using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.Changes;

public sealed class CreateComponentChange : IComponentChange
{
    public CreateComponentChange(Guid componentId, int componentVersion, Component component)
    {
        ComponentId = componentId;
        ComponentVersion = componentVersion;
        Component = component;
    }

    [GraphQLIgnore]
    public Component Component { get; init; }

    public string Kind => nameof(ComponentValuesChange);

    [GraphQLName("component")]
    [UseDataLoader(typeof(IComponentDataLoader))]
    public Guid ComponentId { get; init; }

    public int ComponentVersion { get; init; }
}
