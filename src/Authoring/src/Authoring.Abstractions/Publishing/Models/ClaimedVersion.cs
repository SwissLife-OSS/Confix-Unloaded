using System;
using Confix.CryptoProviders;
using HotChocolate;
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
        EncryptedValue token,
        EncryptedValue refreshToken,
        DateTime claimedAt)
    {
        Id = id;
        GitVersion = gitVersion;
        ApplicationId = applicationId;
        ApplicationPartId = applicationPartId;
        EnvironmentId = environmentId;
        PublishingId = publishingId;
        Token = token;
        ClaimedAt = claimedAt;
        RefreshToken = refreshToken;
    }

    [ID]
    public Guid Id { get; init; }

    public string GitVersion { get; init; }

    public Guid ApplicationId { get; init; }

    public Guid ApplicationPartId { get; init; }

    public Guid EnvironmentId { get; init; }

    public Guid PublishingId { get; init; }

    [GraphQLIgnore]
    public EncryptedValue Token { get; init; }

    [GraphQLIgnore]
    public EncryptedValue RefreshToken { get; init; }

    public DateTime ClaimedAt { get; init; }
}
