using Confix.Authentication.ApiKey;
using Confix.Authoring.ApiKeys;
using MongoDB.Driver;
using static MongoDB.Driver.Builders<Confix.Authentication.ApiKey.ApiKey>;

namespace Confix.Authoring.Store.Mongo.ApiKeys;

internal sealed class ApiKeyStore : IApiKeyStore
{
    private readonly IAuthoringDbContext _dbContext;

    public ApiKeyStore(IAuthoringDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<ApiKey>> FindPossibleKeysByKeyPrefixAsync(
        string prefix,
        CancellationToken cancellationToken)
    {
        var filter = Filter.Eq(x => x.KeyPrefix, prefix);

        return await _dbContext.ApiKeys.Find(filter).ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<ApiKey>> FindKeysByIdsAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken)
    {
        var filter = Filter.In(x => x.Id, ids);

        return await _dbContext.ApiKeys.Find(filter).ToListAsync(cancellationToken);
    }

    public async Task<ApiKey?> FindKeyByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var filter = Filter.Eq(x => x.Id, id);

        return await _dbContext.ApiKeys.Find(filter).FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<ApiKey?> DeleteApiKeyByIdAsync(
        Guid apiKeyId,
        CancellationToken cancellationToken)
    {
        var filter = Filter.Eq(x => x.Id, apiKeyId);
        return await _dbContext.ApiKeys.FindOneAndDeleteAsync(filter, default, cancellationToken);
    }

    public IQueryable<ApiKey> Query() => _dbContext.ApiKeys.AsQueryable();

    public async Task UpsetApiKeyAsync(ApiKey key, CancellationToken cancellationToken)
    {
        await _dbContext.ApiKeys.FindOneAndReplaceAsync(
            Filter.Eq(x => x.Id, key.Id),
            key,
            new FindOneAndReplaceOptions<ApiKey>() { IsUpsert = true },
            cancellationToken);
    }
}
