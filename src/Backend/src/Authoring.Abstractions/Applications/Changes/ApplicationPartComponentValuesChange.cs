using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.Store;

public sealed record ApplicationPartComponentValuesChange : IApplicationPartComponentChange
{
    public ApplicationPartComponentValuesChange()
    {
    }

    public ApplicationPartComponentValuesChange(
        Guid applicationId,
        Guid partId,
        Guid partComponentId,
        string values,
        int applicationVersion,
        int partVersion,
        int partComponentVersion)
    {
        ApplicationId = applicationId;
        PartId = partId;
        PartComponentId = partComponentId;
        Values = values;
        ApplicationVersion = applicationVersion;
        PartVersion = partVersion;
        PartComponentVersion = partComponentVersion;
    }

    public string? Values { get; init; }

    public string Kind => nameof(ApplicationPartComponentValuesChange);

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
}
