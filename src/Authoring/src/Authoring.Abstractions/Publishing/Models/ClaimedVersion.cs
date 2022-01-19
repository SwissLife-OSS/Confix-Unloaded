using System;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.Publishing;

public record ClaimedVersion
{
    public ClaimedVersion(
        Guid id,
        string gitVersion,
        Guid applicationId,
        Guid applicationPartId,
        Guid environmentId,
        Guid publishingId,
        string configuration,
        DateTime claimedAt)
    {
        Id = id;
        GitVersion = gitVersion;
        ApplicationId = applicationId;
        ApplicationPartId = applicationPartId;
        EnvironmentId = environmentId;
        PublishingId = publishingId;
        Configuration = configuration;
        ClaimedAt = claimedAt;
    }

    [ID]
    public Guid Id { get; init; }

    public string GitVersion { get; init; }

    public Guid ApplicationId { get; init; }

    public Guid ApplicationPartId { get; init; }

    public Guid EnvironmentId { get; init; }

    public Guid PublishingId { get; init; }

    public string Configuration { get; init; }

    public DateTime ClaimedAt { get; init; }
}
