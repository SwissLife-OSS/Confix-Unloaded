using Confix.Vault.Abstractions;
using MongoDB.Driver;

namespace Confix.Vault.Store.Mongo;

public interface IVaultDbContext
{
    IMongoCollection<Configuration> Configurations { get; }
}
