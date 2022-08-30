using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Confix.Vault.Abstractions;
using MongoDB.Driver;

namespace Confix.Vault.Store.Mongo;

public class ConfigurationStore : IConfigurationStore
{
    private readonly IConfixVaultDbContext _context;

    public ConfigurationStore(IConfixVaultDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<Configuration>> GetPossibleConfigurationsAsync(
        string applicationName,
        string applicationPartName,
        string environmentName,
        string keyPrefix,
        CancellationToken cancellationToken)
    {
        FilterDefinition<Configuration> filter =
            Builders<Configuration>.Filter.Eq(x => x.ApplicationName, applicationName) &
            Builders<Configuration>.Filter.Eq(x => x.ApplicationPartName, applicationPartName) &
            Builders<Configuration>.Filter.Eq(x => x.EnvironmentName, environmentName) &
            Builders<Configuration>.Filter.Eq(x => x.KeyPrefix, keyPrefix);

        return await _context.Configurations.Find(filter).ToListAsync(cancellationToken);
    }

    public async Task<Configuration> StoreAsync(
        Configuration configuration,
        CancellationToken cancellationToken)
    {
        await _context.Configurations.InsertOneAsync(configuration, cancellationToken);
        return configuration;
    }
}
