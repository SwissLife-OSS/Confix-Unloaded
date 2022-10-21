using MongoDB.Driver;

namespace Confix.CryptoProviders.Mongo;

public interface ICryptoDbContext
{
    IMongoCollection<DataEncryptionKey> Secrets { get; }
}
