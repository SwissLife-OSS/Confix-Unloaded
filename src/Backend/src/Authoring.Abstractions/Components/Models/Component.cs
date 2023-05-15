using System.ComponentModel.DataAnnotations;
using HotChocolate.Types.Relay;

namespace Confix.Authoring;

public sealed record Component
{
    public Component(
        Guid id,
        string name,
        string schema,
        string values,
        string @namespace,
        IReadOnlyList<ComponentScope> scopes,
        int version = 1)
    {
        Id = id;
        Name = name;
        Schema = schema;
        Values = values;
        Namespace = @namespace;
        Scopes = scopes;
        Version = version;
    }

    [ID]
    public Guid Id { get; init; }

    [Required]
    public string Name { get; init; }

    [Required]
    public string Schema { get; init; }

    // TODO: difference between Component.Values <-> DefaultValue resolver
    public string Values { get; init; }

    public string Namespace { get; init; }

    public IReadOnlyList<ComponentScope> Scopes { get; init; }

    public int Version { get; init; }
}
