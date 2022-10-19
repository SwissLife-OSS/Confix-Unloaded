using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.Store;

public sealed record AddPartToApplicationChange : IApplicationPartChange
{
    public AddPartToApplicationChange(
        Guid applicationId,
        int applicationVersion,
        Guid partId,
        int partVersion,
        ApplicationPart addedPart)
    {
        ApplicationId = applicationId;
        ApplicationVersion = applicationVersion;
        PartId = partId;
        PartVersion = partVersion;
        AddedPart = addedPart;
    }

    public ApplicationPart AddedPart { get; init; }

    public string Kind => nameof(AddPartToApplicationChange);

    [GraphQLName("application")]
    [UseDataLoader(typeof(IApplicationDataLoader))]
    public Guid ApplicationId { get; init; }

    public int ApplicationVersion { get; init; }

    [GraphQLName("part")]
    [UseDataLoader(typeof(IApplicationPartDataLoader))]
    public Guid PartId { get; init; }

    public int PartVersion { get; init; }
}
