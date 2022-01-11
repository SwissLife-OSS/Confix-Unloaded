using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.Store;

public record Application
{
    public Application(Guid id, string? name, string? ns, int version)
    {
        Id = id;
        Name = name;
        Namespace = ns;
        Version = version;
    }

    public Application(Guid id, string? name, string? @namespace)
    {
        Id = id;
        Name = name;
        Namespace = @namespace;
    }

    [ID]
    public Guid Id { get; init; }

    [Required]
    public string? Name { get; init; }

    public string? Namespace { get; init; }

    public int Version { get; init; }

    public ICollection<ApplicationPart> Parts { get; init; } =
        new List<ApplicationPart>();
}

public record ApplicationPart
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

public record ApplicationPartComponent
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
