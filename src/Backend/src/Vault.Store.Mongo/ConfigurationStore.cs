using Confix.CryptoProviders;
using Confix.Vault.Abstractions;
using MongoDB.Driver;

namespace Confix.Vault.Store.Mongo;

internal sealed class ConfigurationStore : IConfigurationStore
{
    private readonly IVaultDbContext _context;

    public ConfigurationStore(IVaultDbContext context)
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
        var filter =
            Builders<Configuration>.Filter.Eq(x => x.ApplicationName, applicationName) &
            Builders<Configuration>.Filter.Eq(x => x.ApplicationPartName, applicationPartName) &
            Builders<Configuration>.Filter.Eq(x => x.EnvironmentName, environmentName) &
            Builders<Configuration>.Filter.Eq(x => x.AccessTokenPrefix, keyPrefix);

        return await _context.Configurations.Find(filter).ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Configuration>> GetByRefreshTokenAsync(
        string applicationName,
        string applicationPartName,
        string environmentName,
        string tokenPrefix,
        CancellationToken cancellationToken)
    {
        var filter =
            Builders<Configuration>.Filter.Eq(x => x.ApplicationName, applicationName) &
            Builders<Configuration>.Filter.Eq(x => x.ApplicationPartName, applicationPartName) &
            Builders<Configuration>.Filter.Eq(x => x.EnvironmentName, environmentName) &
            Builders<Configuration>.Filter.Eq(x => x.RefreshToken, tokenPrefix);

        return await _context.Configurations.Find(filter).ToListAsync(cancellationToken);
    }

    public async Task<Configuration> UpdateConfigurationAsync(
        Guid id,
        EncryptedValue encryptedConfiguration,
        CancellationToken cancellationToken)
    {
        var filter = Builders<Configuration>.Filter.Eq(x => x.Id, id);
        var update = Builders<Configuration>.Update
            .Set(x => x.EncryptedConfiguration, encryptedConfiguration);

        FindOneAndUpdateOptions<Configuration> options = new() { IsUpsert = false };

        return await _context.Configurations
            .FindOneAndUpdateAsync(filter, update, options, cancellationToken);
    }

    public async Task<Configuration> StoreAsync(
        Configuration configuration,
        CancellationToken cancellationToken)
    {
        await _context.Configurations.InsertOneAsync(configuration, default, cancellationToken);

        return configuration;
    }
}
