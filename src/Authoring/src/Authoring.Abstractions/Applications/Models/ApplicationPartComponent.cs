using HotChocolate.Types.Relay;

namespace Confix.Authoring.Store;

public sealed record ApplicationPartComponent
{
    public ApplicationPartComponent(Guid id, Guid componentId, int version, string? values)
    {
        Id = id;
        ComponentId = componentId;
        Version = version;
        Values = values;
    }

    public ApplicationPartComponent(Guid id, Guid componentId, string? values)
    {
        Id = id;
        ComponentId = componentId;
        Values = values;
    }

    [ID]
    public Guid Id { get; init; }

    public Guid ComponentId { get; init; }

    public int Version { get; init; }

    public string? Values { get; init; }
}
