using System;
using GreenDonut;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.Store;

public record AddComponentToApplicationPartChange
    : IApplicationPartComponentChange
{
    public AddComponentToApplicationPartChange(
        Guid applicationId,
        int applicationVersion,
        Guid partId,
        int partVersion,
        Guid partComponentId,
        int partComponentVersion,
        ApplicationPartComponent addedComponent)
    {
        ApplicationId = applicationId;
        ApplicationVersion = applicationVersion;
        PartId = partId;
        PartVersion = partVersion;
        PartComponentId = partComponentId;
        PartComponentVersion = partComponentVersion;
        AddedComponent = addedComponent;
    }

    public string Kind => nameof(AddComponentToApplicationPartChange);

    [GraphQLName("application")]
    [UseDataLoader(typeof(IApplicationDataLoader))]
    public Guid ApplicationId { get; init; }

    public int ApplicationVersion { get; init; }

    [GraphQLName("part")]
    [UseDataLoader(typeof(IApplicationPartDataLoader))]
    public Guid PartId { get; init; }

    public int PartVersion { get; init; }

    [GraphQLName("partComponent")]
    [UseDataLoader(typeof(IApplicationPartComponentDataLoader))]
    public Guid PartComponentId { get; init; }

    public int PartComponentVersion { get; init; }

    public ApplicationPartComponent AddedComponent { get; init; }
}
