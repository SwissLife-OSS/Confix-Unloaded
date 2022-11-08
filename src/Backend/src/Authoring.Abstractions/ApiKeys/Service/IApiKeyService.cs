using Confix.Authentication.ApiKey;
using Confix.Authentication.Authorization;

namespace Confix.Authoring.ApiKeys;

public interface IApiKeyService
{
    Task<ApiKey?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken);

    Task<ApiKeyWithSecret> CreateApiKeyAsync(
        string name,
        IEnumerable<RoleScope> roles,
        CancellationToken cancellationToken);

    Task<ApiKey> UpdateApiKeyAsync(
        Guid apiKeyId,
        IEnumerable<RoleScope> roles,
        CancellationToken cancellationToken);

    Task<ApiKey> DeleteApiKeyAsync(
        Guid apiKeyId,
        CancellationToken cancellationToken);

    Task<IQueryable<ApiKey>> PageAsync(CancellationToken cancellationToken);
}
