using Confix.CryptoProviders;
using MongoDB.Driver;

namespace Confix.CryptoProviders.Mongo;

internal class DataEncryptionKeyRepository : IDataEncryptionKeyRepository
{
    private readonly ICryptoDbContext _dbContext;

    public DataEncryptionKeyRepository(ICryptoDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<DataEncryptionKey> GetOrCreateByTopicAsync(
        DataEncryptionKey dataEncryptionKey,
        CancellationToken cancellationToken)
    {
        var filter = Builders<DataEncryptionKey>.Filter.Eq(x => x.Topic, dataEncryptionKey.Topic);

        var update = Builders<DataEncryptionKey>.Update
            .SetOnInsert(x => x.Id, dataEncryptionKey.Id)
            .SetOnInsert(x => x.EncryptionAlgorithm, dataEncryptionKey.EncryptionAlgorithm)
            .SetOnInsert(x => x.Key, dataEncryptionKey.Key)
            .SetOnInsert(x => x.UpdatedAt, dataEncryptionKey.UpdatedAt);

        var options = new FindOneAndUpdateOptions<DataEncryptionKey>
        {
            IsUpsert = true,
            ReturnDocument = ReturnDocument.After
        };

        return await _dbContext.Secrets.FindOneAndUpdateAsync(
            filter,
            update,
            options,
            cancellationToken);
    }

    public async Task<DataEncryptionKey?> GetSecretByTopicAsync(
        string topic,
        CancellationToken cancellationToken)
    {
        var filter = Builders<DataEncryptionKey>.Filter.Eq(x => x.Topic, topic);

        return await _dbContext.Secrets.Find(filter).FirstOrDefaultAsync(cancellationToken);
    }
}
