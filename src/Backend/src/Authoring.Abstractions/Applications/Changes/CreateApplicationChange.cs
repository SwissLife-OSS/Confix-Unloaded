using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.Store;

public sealed record CreateApplicationChange : IApplicationChange
{
    public CreateApplicationChange(
        Guid applicationId,
        int applicationVersion,
        Application application)
    {
        ApplicationId = applicationId;
        ApplicationVersion = applicationVersion;
        Application = application;
    }

    public Application Application { get; init; }

    public string Kind => nameof(CreateApplicationChange);

    [GraphQLName("application")]
    [UseDataLoader(typeof(IApplicationDataLoader))]
    public Guid ApplicationId { get; init; }

    public int ApplicationVersion { get; init; }
}
