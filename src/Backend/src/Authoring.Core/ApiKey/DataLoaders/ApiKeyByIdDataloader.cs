using Confix.Authentication.ApiKey;
using GreenDonut;

namespace Confix.Authoring.ApiKeys.DataLoaders;

internal sealed class ApiKeyByIdDataLoader : BatchDataLoader<Guid, ApiKey>, IApiKeyByIdDataLoader
{
    private readonly IApiKeyStore _store;

    public ApiKeyByIdDataLoader(
        IBatchScheduler batchScheduler,
        IApiKeyStore store,
        DataLoaderOptions? options = null) : base(batchScheduler, options)
    {
        _store = store;
    }

    protected override async Task<IReadOnlyDictionary<Guid, ApiKey>> LoadBatchAsync(
        IReadOnlyList<Guid> keys,
        CancellationToken cancellationToken)
    {
        var roles = await _store.FindKeysByIdsAsync(keys, cancellationToken);

        return roles.ToDictionary(x => x.Id);
    }
}
