using System.Collections.Immutable;
using Confix.Authentication.ApiKey;
using Confix.Authentication.Authorization;
using Confix.Common.Exceptions;
using Confix.Common.Token;

namespace Confix.Authoring.ApiKeys;

internal sealed class ApiKeyService : IApiKeyService
{
    private readonly IApiKeyStore _apiKeyStore;
    private readonly ITokenProvider _provider;
    private readonly ISessionAccessor _sessionAccessor;
    private readonly IAuthorizationService _authorizationService;

    public ApiKeyService(
        IApiKeyStore apiKeyStore,
        ITokenProvider provider,
        ISessionAccessor sessionAccessor,
        IAuthorizationService authorizationService)
    {
        _apiKeyStore = apiKeyStore;
        _provider = provider;
        _sessionAccessor = sessionAccessor;
        _authorizationService = authorizationService;
    }

    public async Task<ApiKey?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var key = await _apiKeyStore.FindKeyByIdAsync(id, cancellationToken);

        if (key is null ||
            !await _authorizationService
                .RuleFor<ApiKey>()
                .IsAuthorizedAsync(key, Permissions.Write, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        return key;
    }

    public async Task<ApiKeyWithSecret> CreateApiKeyAsync(
        string name,
        IEnumerable<RoleScope> roles,
        CancellationToken cancellationToken)
    {
        var token = _provider.GenerateToken();
        var key = new ApiKey(
            Guid.NewGuid(),
            name,
            token.Hashed,
            ApiKey.GetPrefix(token.PlainText),
            roles.ToImmutableHashSet());

        if (!await _authorizationService
                .RuleFor<ApiKey>()
                .IsAuthorizedAsync(key, Permissions.Write, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        await _apiKeyStore.UpsetApiKeyAsync(key, cancellationToken);

        return new ApiKeyWithSecret(key, token.PlainText);
    }

    public async Task<ApiKey> UpdateApiKeyAsync(
        Guid apiKeyId,
        IEnumerable<RoleScope> roles,
        CancellationToken cancellationToken)
    {
        var key = await _apiKeyStore.FindKeyByIdAsync(apiKeyId, cancellationToken);

        if (key is null ||
            !await _authorizationService
                .RuleFor<ApiKey>()
                .IsAuthorizedAsync(key, Permissions.Write, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        key = key with { Roles = roles.ToImmutableHashSet() };

        await _apiKeyStore.UpsetApiKeyAsync(key, cancellationToken);

        return key;
    }

    public async Task<ApiKey> DeleteApiKeyAsync(
        Guid apiKeyId,
        CancellationToken cancellationToken)
    {
        var apiKey = await _apiKeyStore.FindKeyByIdAsync(apiKeyId, cancellationToken);
        if (!await _authorizationService
                .RuleFor<ApiKey>()
                .IsAuthorizedAsync(apiKey, Permissions.Write, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        var result = await _apiKeyStore.DeleteApiKeyByIdAsync(apiKeyId, cancellationToken);
        if (result is null)
        {
            throw new UnauthorizedOperationException();
        }

        return result;
    }

    public async Task<IQueryable<ApiKey>> PageAsync(CancellationToken cancellationToken)
    {
        var session = await _sessionAccessor.GetSession(cancellationToken);
        if (session is null ||
            !session.HasPermission(WellKnownNamespaces.Global, Scope.Identity, Permissions.Read))
        {
            return Array.Empty<ApiKey>().AsQueryable();
        }

        return _apiKeyStore.Query();
    }
}
