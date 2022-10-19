using System;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.Changes;

public sealed class ComponentSchemaChange : IComponentChange
{
    public ComponentSchemaChange(Guid componentId, int componentVersion, string schema)
    {
        ComponentId = componentId;
        ComponentVersion = componentVersion;
        Schema = schema;
    }

    public string Kind => nameof(ComponentSchemaChange);

    [GraphQLName("component")]
    [UseDataLoader(typeof(IComponentDataLoader))]
    public Guid ComponentId { get; init; }

    public int ComponentVersion { get; init; }

    public string Schema { get; init; }
}
