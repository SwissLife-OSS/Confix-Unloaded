using Confix.CryptoProviders;
using HotChocolate;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.Publishing;

public sealed record ClaimedVersion
{
    public ClaimedVersion(
        Guid id,
        string tag,
        Guid applicationId,
        Guid applicationPartId,
        Guid environmentId,
        Guid publishingId,
        EncryptedValue token,
        EncryptedValue refreshToken,
        EncryptedValue decryptionKey,
        DateTime claimedAt)
    {
        Id = id;
        Tag = tag;
        ApplicationId = applicationId;
        ApplicationPartId = applicationPartId;
        EnvironmentId = environmentId;
        PublishingId = publishingId;
        Token = token;
        ClaimedAt = claimedAt;
        RefreshToken = refreshToken;
        DecryptionKey = decryptionKey;
    }

    [ID]
    public Guid Id { get; init; }

    public string Tag { get; init; }

    public Guid ApplicationId { get; init; }

    public Guid ApplicationPartId { get; init; }

    public Guid EnvironmentId { get; init; }

    public Guid PublishingId { get; init; }

    [GraphQLIgnore]
    public EncryptedValue Token { get; init; }

    [GraphQLIgnore]
    public EncryptedValue RefreshToken { get; init; }

    [GraphQLIgnore]
    public EncryptedValue DecryptionKey { get; init; }

    public DateTime ClaimedAt { get; init; }
}
