using System.Text.Json;

namespace Confix.CryptoProviders.AzureKeyVault;

public record struct CypherAndIv(string Cypher, string Iv)
{
    public string Serialize() => JsonSerializer.Serialize(this);

    public static CypherAndIv Deserialize(string value)
        => JsonSerializer.Deserialize<CypherAndIv>(value);
}
