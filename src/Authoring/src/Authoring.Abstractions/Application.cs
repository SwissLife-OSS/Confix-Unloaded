using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.Store;

public record Application
{
    [ID]
    public Guid Id { get; set; }

    [Required]
    public string? Name { get; set; }

    public string? Namespace { get; set; }

    public int Version { get; set; }

    public ICollection<ApplicationPart> Parts { get; set; } =
        new List<ApplicationPart>();
}

public record ApplicationPart
{
    [ID]
    public Guid Id { get; set; }

    [Required]
    public string? Name { get; set; }

    public int Version { get; set; }

    public ICollection<ApplicationPartComponent> Components { get; set; } =
        new List<ApplicationPartComponent>();
}

public record ApplicationPartComponent
{
    [ID]
    public Guid Id { get; set; }

    public Guid ComponentId { get; set; }

    public int Version { get; set; }

    public string? Values { get; set; }
}
