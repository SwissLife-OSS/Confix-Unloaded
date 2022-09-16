using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authentication.Authorization;

public class AuthorizationService : IAuthorizationService
{
    private readonly IServiceProvider _serviceProvider;

    public AuthorizationService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public ValueTask<bool> IsAuthorized<T>(T resource, CancellationToken cancellationToken)
    {
        var handler = _serviceProvider.GetService<IAuthorizationRule<T>>();

        if (handler is null)
        {
            return new ValueTask<bool>(false);
        }

        return handler.IsAuthorizedAsync(resource, cancellationToken);
    }
}
