using System;
using GreenDonut;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.Store;

public sealed record RenameApplicationChange : IApplicationChange
{
    public RenameApplicationChange(Guid applicationId, int applicationVersion, string name)
    {
        ApplicationId = applicationId;
        ApplicationVersion = applicationVersion;
        Name = name;
    }

    public string Kind => nameof(RenameApplicationChange);

    [GraphQLName("application")]
    [UseDataLoader(typeof(IApplicationDataLoader))]
    public Guid ApplicationId { get; init; }

    public int ApplicationVersion { get; init; }

    public string Name { get; init; }
}
