namespace Confix.Authentication.ApiKey;

public interface IApiKeyProvider
{
    /// <summary>
    /// Validates the key and provides with and instance of <see cref="ApiKey"/>.
    /// </summary>
    /// <param name="key"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    Task<ApiKey?> ProvideAsync(string key, CancellationToken cancellationToken);

    Task<ApiKey?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
}
