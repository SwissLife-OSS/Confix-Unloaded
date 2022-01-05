using System;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.Changes;

public record RemoveComponentChange : IComponentChange
{
    public string Kind => nameof(ComponentValuesChange);

    [GraphQLName("component")]
    [UseDataLoader(typeof(IComponentDataLoader))]
    public Guid ComponentId { get; init; }

    public int ComponentVersion { get; init; }

    [GraphQLIgnore]
    public Component Component { get; init; }
}
