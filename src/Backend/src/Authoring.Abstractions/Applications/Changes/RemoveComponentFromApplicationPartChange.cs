using System;
using GreenDonut;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.Store;

public sealed record RemoveComponentFromApplicationPartChange : IApplicationPartComponentChange
{
    public RemoveComponentFromApplicationPartChange(
        Guid applicationId,
        int applicationVersion,
        Guid partId,
        int partVersion,
        Guid partComponentId,
        int partComponentVersion,
        ApplicationPartComponent removedComponent)
    {
        ApplicationId = applicationId;
        ApplicationVersion = applicationVersion;
        PartId = partId;
        PartVersion = partVersion;
        PartComponentId = partComponentId;
        PartComponentVersion = partComponentVersion;
        RemovedComponent = removedComponent;
    }

    public string Kind => nameof(RemoveComponentFromApplicationPartChange);

    [GraphQLName("application")]
    [UseDataLoader(typeof(IApplicationDataLoader))]
    public Guid ApplicationId { get; init; }

    public int ApplicationVersion { get; init; }

    [GraphQLName("part")]
    [UseDataLoader(typeof(IApplicationPartDataLoader))]
    public Guid PartId { get; init; }

    public int PartVersion
    {
        get;
        init;
    }

    [GraphQLName("partComponent")]
    [UseDataLoader(typeof(IApplicationPartComponentDataLoader))]
    public Guid PartComponentId { get; init; }

    public int PartComponentVersion { get; init; }

    public ApplicationPartComponent RemovedComponent { get; init; }
}
