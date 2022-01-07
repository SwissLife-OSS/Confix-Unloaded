using System;
using GreenDonut;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.Store;

public record RenameApplicationPartChange : IApplicationPartChange
{
    public RenameApplicationPartChange(
        Guid applicationId,
        string name,
        int applicationVersion,
        Guid partId,
        int partVersion)
    {
        ApplicationId = applicationId;
        Name = name;
        ApplicationVersion = applicationVersion;
        PartId = partId;
        PartVersion = partVersion;
    }

    public string Kind => nameof(RenameApplicationPartChange);

    [GraphQLName("application")]
    [UseDataLoader(typeof(IApplicationDataLoader))]
    public Guid ApplicationId { get; init; }

    public int ApplicationVersion { get; init; }

    [GraphQLName("part")]
    [UseDataLoader(typeof(IApplicationPartDataLoader))]
    public Guid PartId { get; init; }

    public int PartVersion { get; init; }

    public string Name { get; init; }
}
