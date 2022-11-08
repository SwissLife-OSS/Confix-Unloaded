using Confix.Authentication.ApiKey;
using Confix.Common.Token;
using HotChocolate.Utilities;

namespace Confix.Authoring.ApiKeys;

public class ApiKeyProvider : IApiKeyProvider
{
    private readonly IApiKeyStore _store;
    private readonly ITokenProvider _tokenProvider;

    public ApiKeyProvider(IApiKeyStore store, ITokenProvider tokenProvider)
    {
        _store = store;
        _tokenProvider = tokenProvider;
    }

    public async Task<ApiKey?> ProvideAsync(string key, CancellationToken cancellationToken)
    {
        var possibleKeys = await _store
            .FindPossibleKeysByKeyPrefixAsync(ApiKey.GetPrefix(key), cancellationToken);

        if (possibleKeys.Count == 0)
        {
            return null;
        }

        foreach (var possibleKey in possibleKeys)
        {
            if (_tokenProvider.ValidateToken(possibleKey.KeyHash, key))
            {
                return possibleKey;
            }
        }

        return null;
    }

    public async Task<ApiKey?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _store.FindKeyByIdAsync(id, cancellationToken);
    }
}
