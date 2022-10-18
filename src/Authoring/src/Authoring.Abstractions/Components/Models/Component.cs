using System;
using System.ComponentModel.DataAnnotations;
using HotChocolate.Types.Relay;

namespace Confix.Authoring;

public record Component
{
    public Component(
        Guid id,
        string? name,
        string? schema,
        string? values,
        int version,
        ComponentState state,
        string ns)
    {
        Id = id;
        Name = name;
        Schema = schema;
        Values = values;
        Version = version;
        State = state;
        Namespace = ns;
    }

    public Component(
        Guid id,
        string? name,
        string? schema,
        string? values,
        ComponentState state,
        string ns)
    {
        Id = id;
        Name = name;
        Schema = schema;
        Values = values;
        State = state;
        Namespace = ns;
    }

    [ID]
    public Guid Id { get; init; }

    [Required]
    public string? Name { get; init; }

    [Required]
    public string? Schema { get; init; }

    public string? Values { get; init; }

    public string Namespace { get; init; }

    public int Version { get; init; }

    public ComponentState State { get; init; }
}
