using System;
using GreenDonut;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.Store;

public record CreateApplicationChange : IApplicationChange
{
    public CreateApplicationChange(Guid applicationId, int applicationVersion, Application application)
    {
        ApplicationId = applicationId;
        ApplicationVersion = applicationVersion;
        Application = application;
    }

    public string Kind => nameof(CreateApplicationChange);

    [GraphQLName("application")]
    [UseDataLoader(typeof(IApplicationDataLoader))]
    public Guid ApplicationId { get; init; }

    public int ApplicationVersion { get; init; }

    public Application Application { get; init; }
}
