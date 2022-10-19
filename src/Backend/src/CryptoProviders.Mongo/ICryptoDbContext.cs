using MongoDB.Driver;

namespace Confix.CryptoProviders;

public interface ICryptoDbContext
{
    IMongoCollection<DataEncryptionKey> Secrets { get; }
}
