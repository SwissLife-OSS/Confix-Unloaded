using System;
using GreenDonut;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.Store;

public record RemovePartFromApplicationChange : IApplicationPartChange
{
    public string Kind => nameof(RemovePartFromApplicationChange);

    [GraphQLName("application")]
    [UseDataLoader(typeof(IApplicationDataLoader))]
    public Guid ApplicationId { get; init; }

    public ApplicationPart RemovedPart { get; init; }

    public int ApplicationVersion { get; init; }

    [GraphQLName("part")]
    [UseDataLoader(typeof(IApplicationPartDataLoader))]
    public Guid PartId { get; init; }

    public int PartVersion { get; init; }
}
