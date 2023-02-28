using Confix.Authoring.GraphQL.Publishing;
using Confix.CryptoProviders;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(typeof(ClaimVersionResult))]
public sealed class ClaimResultExtensions
{
    public async Task<string?> GetTokenAsync(
        [Service] IDecryptor service,
        [Parent] ClaimVersionResult claimVersionResult,
        CancellationToken cancellationToken)
    {
        return await service.DecryptAsync(claimVersionResult.Version.Token, cancellationToken);
    }

    public async Task<string?> GetDecryptionKey(
        [Service] IDecryptor service,
        [Parent] ClaimVersionResult claimVersionResult,
        CancellationToken cancellationToken)
    {
        return await service.DecryptAsync(claimVersionResult.Version.DecryptionKey, cancellationToken);
    }
}
