using Confix.Authentication.ApiKey;
using Confix.Authentication.Authorization;
using Confix.Authoring.ApiKeys;
using Confix.Common.Exceptions;

namespace Confix.Authoring.GraphQL.ApiKeys;

[ExtendObjectType(OperationTypeNames.Mutation)]
public class ApiKeyMutations
{
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<ApiKeyWithSecret> CreateApiKeyAsync(
        [Service] IApiKeyService apiKeyService,
        string name,
        IEnumerable<RoleScope> roles,
        CancellationToken cancellationToken)
    {
        return await apiKeyService.CreateApiKeyAsync(name, roles, cancellationToken);
    }

    [Error(typeof(UnauthorizedOperationException))]
    public async Task<ApiKey> UpdateApiKeyAsync(
        [Service] IApiKeyService apiKeyService,
        [ID(nameof(ApiKey))] Guid id,
        IEnumerable<RoleScope> roles,
        CancellationToken cancellationToken)
    {
        return await apiKeyService.UpdateApiKeyAsync(id, roles, cancellationToken);
    }

    [Error(typeof(UnauthorizedOperationException))]
    public async Task<ApiKey> RemoveApiKeyByIdAsync(
        [Service] IApiKeyService apiKeyService,
        [ID(nameof(ApiKey))] Guid id,
        CancellationToken cancellationToken)
    {
        return await apiKeyService.DeleteApiKeyAsync(id, cancellationToken);
    }
}
