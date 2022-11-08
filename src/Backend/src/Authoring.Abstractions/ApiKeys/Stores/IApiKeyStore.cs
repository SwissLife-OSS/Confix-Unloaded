using Confix.Authentication.ApiKey;

namespace Confix.Authoring.ApiKeys;

public interface IApiKeyStore
{
    Task<IReadOnlyList<ApiKey>> FindPossibleKeysByKeyPrefixAsync(
        string key,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<ApiKey>> FindKeysByIdsAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken);

    Task<ApiKey?> FindKeyByIdAsync(Guid id, CancellationToken cancellationToken);

    Task<ApiKey?> DeleteApiKeyByIdAsync(
        Guid apiKeyId,
        CancellationToken cancellationToken);

    IQueryable<ApiKey> Query();

    Task UpsetApiKeyAsync(ApiKey key, CancellationToken cancellationToken);
}
