using System;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.Changes;

public record ComponentSchemaChange : IComponentChange
{
    public string Kind => nameof(ComponentSchemaChange);

    [GraphQLName("component")]
    [UseDataLoader(typeof(IComponentDataLoader))]
    public Guid ComponentId { get; init; }

    public int ComponentVersion { get; init; }

    public string Schema { get; init; }
}
