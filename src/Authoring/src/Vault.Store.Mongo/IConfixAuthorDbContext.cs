using Confix.Vault.Abstractions;
using MongoDB.Driver;

namespace Confix.Vault.Store.Mongo;

public interface IConfixVaultDbContext
{
    IMongoCollection<Configuration> Configurations { get; }
}
