using System.Threading;
using System.Threading.Tasks;
using Confix.CryptoProviders;
using MongoDB.Driver;

namespace Confix.Authoring.Store.Mongo;

internal class SecretRepository : ISecretRepository
{
    private readonly IConfixCryptoDbContext _dbContext;

    public SecretRepository(IConfixCryptoDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Secret> GetOrCreateByTopicAsync(
        Secret secret,
        CancellationToken cancellationToken)
    {
        FilterDefinition<Secret> filter = Builders<Secret>.Filter.Eq(x => x.Topic, secret.Topic);

        UpdateDefinition<Secret> update = Builders<Secret>.Update
            .SetOnInsert(x => x.Id, secret.Id)
            .SetOnInsert(x => x.EncryptionAlgorithm, secret.EncryptionAlgorithm)
            .SetOnInsert(x => x.Key, secret.Key)
            .SetOnInsert(x => x.UpdatedAt, secret.UpdatedAt);

        FindOneAndUpdateOptions<Secret> options = new()
        {
            IsUpsert = true,
            ReturnDocument = ReturnDocument.After
        };

        return await _dbContext.Secrets
            .FindOneAndUpdateAsync(filter, update, options, cancellationToken);
    }

    public async Task<Secret> GetSecretByTopicAsync(
        string topic,
        CancellationToken cancellationToken)
    {
        FilterDefinition<Secret> filter = Builders<Secret>.Filter.Eq(x => x.Topic, topic);

        return await _dbContext.Secrets.Find(filter).FirstOrDefaultAsync(cancellationToken);
    }
}
