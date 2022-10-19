using System;

namespace Confix.CryptoProviders;

public sealed class Secret
{
    public Secret(
        Guid id,
        DateTime updatedAt,
        string topic,
        string key,
        string encryptionAlgorithm)
    {
        Id = id;
        UpdatedAt = updatedAt;
        Topic = topic;
        Key = key;
        EncryptionAlgorithm = encryptionAlgorithm;
    }

    public Guid Id { get; init; }

    public DateTime UpdatedAt { get; init; }

    public string Topic { get; init; }

    public string EncryptionAlgorithm { get; init; }

    public string Key { get; init; }
}
