namespace Confix.Authoring;

public record VariableEncryptionInfo
{
    public VariableEncryptionInfo(string keyProvider, string key, string algorithm)
    {
        KeyProvider = keyProvider;
        Key = key;
        Algorithm = algorithm;
    }

    public string KeyProvider { get; init; }

    public string Key { get; init; }

    public string Algorithm { get; init; }
}
