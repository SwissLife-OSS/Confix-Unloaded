using System;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.Publishing;

public record ClaimedVersion
{
    public ClaimedVersion(
        Guid id,
        string gitVersion,
        string applicationName,
        string applicationPartName,
        string environmentName,
        Guid publishingId,
        string configuration,
        DateTime claimedAt)
    {
        Id = id;
        GitVersion = gitVersion;
        ApplicationName = applicationName;
        ApplicationPartName = applicationPartName;
        EnvironmentName = environmentName;
        PublishingId = publishingId;
        Configuration = configuration;
        ClaimedAt = claimedAt;
    }

    [ID]
    public Guid Id { get; init; }

    public string GitVersion { get; init; }

    public string ApplicationName { get; init; }

    public string ApplicationPartName { get; init; }

    public string EnvironmentName { get; init; }

    [ID(nameof(PublishedApplicationPart))]
    public Guid PublishingId { get; init; }

    public string Configuration { get; init; }

    public DateTime ClaimedAt { get; init; }
}
