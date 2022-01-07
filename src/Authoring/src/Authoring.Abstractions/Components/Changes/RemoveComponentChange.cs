using System;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.Changes;

public class RemoveComponentChange : IComponentChange
{
    public RemoveComponentChange(Guid componentId, int componentVersion, Component component)
    {
        ComponentId = componentId;
        ComponentVersion = componentVersion;
        Component = component;
    }

    public string Kind => nameof(ComponentValuesChange);

    [GraphQLName("component")]
    [UseDataLoader(typeof(IComponentDataLoader))]
    public Guid ComponentId { get; init; }

    public int ComponentVersion { get; init; }

    [GraphQLIgnore]
    public Component Component { get; init; }
}
