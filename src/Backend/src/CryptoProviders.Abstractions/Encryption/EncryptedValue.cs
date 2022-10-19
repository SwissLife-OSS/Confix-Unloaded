namespace Confix.CryptoProviders;

public sealed record EncryptedValue(string Value, string Iv, string Topic);
