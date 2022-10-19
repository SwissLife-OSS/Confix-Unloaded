using System.ComponentModel.DataAnnotations;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.Store;

public sealed record Application
{
    public Application(Guid id, string? name, string @namespace)
    {
        Id = id;
        Name = name;
        Namespace = @namespace;
    }

    [ID]
    public Guid Id { get; init; }

    [Required]
    public string? Name { get; init; }

    public string Namespace { get; init; }

    public int Version { get; init; }

    public ICollection<ApplicationPart> Parts { get; init; } = new List<ApplicationPart>();
}
