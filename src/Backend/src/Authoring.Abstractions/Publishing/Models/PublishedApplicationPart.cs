using Confix.Authentication.Authorization;
using Confix.Authoring.Store;

namespace Confix.Authoring.Publishing;

public sealed class PublishedApplicationPart
{
    public PublishedApplicationPart(
        Guid id,
        int version,
        ApplicationPart part,
        string configuration,
        DateTime publishedAt,
        UserInfo publishedBy)
    {
        Id = id;
        Version = version;
        Part = part;
        Configuration = configuration;
        PublishedAt = publishedAt;
        PublishedBy = publishedBy;
    }

    public Guid Id { get; init; }

    public int Version { get; init; }

    public ApplicationPart Part { get; init; }

    public string Configuration { get; init; }

    public DateTime PublishedAt { get; init; }

    public UserInfo PublishedBy { get; init; }
}
