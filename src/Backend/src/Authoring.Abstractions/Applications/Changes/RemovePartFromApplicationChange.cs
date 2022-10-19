using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.Store;

public sealed record RemovePartFromApplicationChange : IApplicationPartChange
{
    public RemovePartFromApplicationChange(
        Guid applicationId,
        ApplicationPart removedPart,
        int applicationVersion,
        Guid partId,
        int partVersion)
    {
        ApplicationId = applicationId;
        RemovedPart = removedPart;
        ApplicationVersion = applicationVersion;
        PartId = partId;
        PartVersion = partVersion;
    }

    public ApplicationPart RemovedPart { get; init; }

    public string Kind => nameof(RemovePartFromApplicationChange);

    [GraphQLName("application")]
    [UseDataLoader(typeof(IApplicationDataLoader))]
    public Guid ApplicationId { get; init; }

    public int ApplicationVersion { get; init; }

    [GraphQLName("part")]
    [UseDataLoader(typeof(IApplicationPartDataLoader))]
    public Guid PartId { get; init; }

    public int PartVersion { get; init; }
}
