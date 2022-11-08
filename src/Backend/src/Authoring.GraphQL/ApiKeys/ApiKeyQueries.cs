using Confix.Authentication.ApiKey;
using Confix.Authoring.ApiKeys;

namespace Confix.Authoring.GraphQL.ApiKeys;

[ExtendObjectType(OperationTypeNames.Query)]
public class ApiKeyQueries
{
    [UsePaging]
    public async Task<IQueryable<ApiKey>> GetApiKeysAsync(
        [Service] IApiKeyService apiKeyService,
        CancellationToken cancellationToken)
    {
        return await apiKeyService.PageAsync(cancellationToken);
    }

    public async Task<ApiKey?> GetApiKeyByIdAsync(
        [Service] IApiKeyService apiKeyService,
        [ID(nameof(ApiKey))] Guid id,
        CancellationToken cancellationToken)
    {
        return await apiKeyService.GetByIdAsync(id, cancellationToken);
    }
}
