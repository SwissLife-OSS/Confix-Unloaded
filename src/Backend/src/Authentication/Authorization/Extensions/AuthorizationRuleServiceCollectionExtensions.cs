using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Confix.Authentication.Authorization;

public static class AuthorizationRuleServiceCollectionExtensions
{
    public static IServiceCollection AddAuthorizationRule<T, TRule>(
        this IServiceCollection services) where TRule : class, IAuthorizationRule<T>
    {
        services.TryAddScoped<IAuthorizationService, AuthorizationService>();
        services.AddScoped<TRule>();
        services.AddScoped<IAuthorizationRule<T>, TRule>(sp => sp.GetRequiredService<TRule>());

        return services;
    }
}
