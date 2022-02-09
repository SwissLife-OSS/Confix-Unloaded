using MongoDB.Driver;

namespace Confix.CryptoProviders;

public interface IConfixCryptoDbContext
{
    IMongoCollection<Secret> Secrets { get; }
}
