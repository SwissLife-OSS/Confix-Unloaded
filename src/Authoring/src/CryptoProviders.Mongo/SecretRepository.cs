using Confix.CryptoProviders;
using MongoDB.Driver;

namespace Confix.Authoring.Store.Mongo;

internal class SecretRepository : ISecretRepository
{
    private readonly ICryptoDbContext _dbContext;

    public SecretRepository(ICryptoDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Secret> GetOrCreateByTopicAsync(
        Secret secret,
        CancellationToken cancellationToken)
    {
        var filter = Builders<Secret>.Filter.Eq(x => x.Topic, secret.Topic);

        var update = Builders<Secret>.Update
            .SetOnInsert(x => x.Id, secret.Id)
            .SetOnInsert(x => x.EncryptionAlgorithm, secret.EncryptionAlgorithm)
            .SetOnInsert(x => x.Key, secret.Key)
            .SetOnInsert(x => x.UpdatedAt, secret.UpdatedAt);

        var options = new FindOneAndUpdateOptions<Secret>
        {
            IsUpsert = true, ReturnDocument = ReturnDocument.After
        };

        return await _dbContext.Secrets
            .FindOneAndUpdateAsync(filter, update, options, cancellationToken);
    }

    public async Task<Secret> GetSecretByTopicAsync(
        string topic,
        CancellationToken cancellationToken)
    {
        var filter = Builders<Secret>.Filter.Eq(x => x.Topic, topic);

        return await _dbContext.Secrets.Find(filter).FirstOrDefaultAsync(cancellationToken);
    }
}
