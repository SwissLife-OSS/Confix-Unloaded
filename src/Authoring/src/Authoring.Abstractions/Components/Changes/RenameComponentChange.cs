using System;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.Changes;

public class RenameComponentChange : IComponentChange
{
    public string Kind => nameof(RenameComponentChange);

    [GraphQLName("component")]
    [UseDataLoader(typeof(IComponentDataLoader))]
    public Guid ComponentId { get; init; }

    public int ComponentVersion { get; init; }

    public string Name { get; init; }
}
