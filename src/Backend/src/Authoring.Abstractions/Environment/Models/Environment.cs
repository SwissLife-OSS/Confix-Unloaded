using HotChocolate.Types.Relay;

namespace Confix.Authoring;

public sealed record Environment
{
    public Environment(Guid id, string? name = null!)
    {
        name ??= string.Empty;
        Id = id;
        Name = name;
    }

    [ID]
    public Guid Id { get; init; }

    public string Name { get; init; }

    public Guid? ParentId { get; init; }

    public bool AllowDeveloperAccess { get; init; }
}
