using System.ComponentModel.DataAnnotations;
using HotChocolate.Types.Relay;

namespace Confix.Authoring;

public sealed record Component
{
    public Component(
        Guid id,
        string? name,
        string? schema,
        string? values,
        int version,
        ComponentState state,
        IReadOnlyList<ComponentScope> scopes)
    {
        Id = id;
        Name = name;
        Schema = schema;
        Values = values;
        Version = version;
        State = state;
        Scopes = scopes;
    }

    public Component(
        Guid id,
        string? name,
        string? schema,
        string? values,
        ComponentState state,
        IReadOnlyList<ComponentScope> scopes)
    {
        Id = id;
        Name = name;
        Schema = schema;
        Values = values;
        State = state;
        Scopes = scopes;
    }

    [ID]
    public Guid Id { get; init; }

    [Required]
    public string? Name { get; init; }

    [Required]
    public string? Schema { get; init; }

    public string? Values { get; init; }

    public IReadOnlyList<ComponentScope> Scopes { get; init; }

    public int Version { get; init; }

    public ComponentState State { get; init; }
}
