using System.ComponentModel.DataAnnotations;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.Store;

public sealed  record ApplicationPart
{
    public ApplicationPart(Guid id, string? name, int version)
    {
        Id = id;
        Name = name;
        Version = version;
    }

    public ApplicationPart(Guid id, string? name)
    {
        Id = id;
        Name = name;
    }

    [ID]
    public Guid Id { get; init; }

    [Required]
    public string? Name { get; init; }

    public int Version { get; init; }

    public ICollection<ApplicationPartComponent> Components { get; init; } =
        new List<ApplicationPartComponent>();
}
