using System;
using Confix.Authoring.Store;

namespace Confix.Authoring.Publishing;

public class PublishedApplicationPart
{
    public PublishedApplicationPart(
        Guid id,
        int version,
        ApplicationPart part,
        string configuration)
    {
        Id = id;
        Version = version;
        Part = part;
        Configuration = configuration;
    }

    public Guid Id { get; init; }

    public int Version { get; init; }

    public ApplicationPart Part { get; init; }

    public string Configuration { get; init; }
}
