using MongoDB.Driver;

namespace Confix.CryptoProviders;

public interface ICryptoDbContext
{
    IMongoCollection<Secret> Secrets { get; }
}
