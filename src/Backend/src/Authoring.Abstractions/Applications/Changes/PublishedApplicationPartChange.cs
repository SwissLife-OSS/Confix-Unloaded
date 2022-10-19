using System;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.Store;

public sealed record PublishedApplicationPartChange : IApplicationPartChange
{
    public PublishedApplicationPartChange(
        Guid applicationId,
        int applicationVersion,
        Guid partId,
        int partVersion)
    {
        ApplicationId = applicationId;
        ApplicationVersion = applicationVersion;
        PartId = partId;
        PartVersion = partVersion;
    }

    public string Kind => nameof(PublishedApplicationPartChange );

    [GraphQLName("application")]
    [UseDataLoader(typeof(IApplicationDataLoader))]
    public Guid ApplicationId { get; init; }

    public int ApplicationVersion { get; init; }

    [GraphQLName("part")]
    [UseDataLoader(typeof(IApplicationPartDataLoader))]
    public Guid PartId { get; init; }

    public int PartVersion { get; init; }
}
