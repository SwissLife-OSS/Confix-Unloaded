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
        IReadOnlyList<ComponentScope> scopes)
    {
        Id = id;
        Name = name;
        Schema = schema;
        Values = values;
        Scopes = scopes;
        Version = version;
    }

    [ID]
    public Guid Id { get; init; }

    [Required]
    public string? Name { get; init; }

    [Required]
    public string? Schema { get; init; }

    public string? Values { get; init; }

    // TODO: figure out how to do a "root-scope"
    // public ComponentScope RootScope {get;init;}
    public string Namespace {get;init;}
    public IReadOnlyList<ComponentScope> Scopes { get; init; }

    public int Version { get; init; }
}
