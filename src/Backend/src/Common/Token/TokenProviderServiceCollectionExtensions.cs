using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Common.Token;

public static class TokenProviderServiceCollectionExtensions
{
    public static IServiceCollection AddTokenProvider(this IServiceCollection services)
    {
        services.AddSingleton<IPasswordHasher<object>, PasswordHasher<object>>();
        services.AddSingleton<ITokenProvider, TokenProvider>();

        return services;
    }
}
