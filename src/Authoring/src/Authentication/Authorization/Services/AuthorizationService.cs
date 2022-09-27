using GreenDonut;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authentication.Authorization;

public class AuthorizationService : IAuthorizationService
{
    private readonly IServiceProvider _serviceProvider;

    public AuthorizationService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public ValueTask<bool> IsAuthorized<T>(
        T resource,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        var handler = _serviceProvider.GetService<IAuthorizationRule<T>>();

        if (handler is null)
        {
            return new ValueTask<bool>(false);
        }

        return handler.IsAuthorizedAsync(resource, permissions, cancellationToken);
    }

    public async ValueTask<bool> IsAuthorized<T>(
        Guid resourceId,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        var loader = _serviceProvider.GetRequiredService<IDataLoader<Guid, T>>();
        var resource = await loader.LoadAsync(resourceId, cancellationToken);
        return await IsAuthorized(resource, permissions, cancellationToken);
    }
}
