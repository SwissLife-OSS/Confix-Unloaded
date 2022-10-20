using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authentication.Authorization;

public static class AuthorizationPolicyExtensions
{
    public static IServiceCollection AddAuthorizationAndPolicies(this IServiceCollection services)
    {
        services.AddAuthorization(ConfigurePolicies);

        return services;
    }

    public static IServiceCollection AddSessionAccessor(this IServiceCollection services)
    {
        services.AddSingleton<IGroupProvider, GroupProvider>();
        services.AddSingleton<IRoleProvider, RoleProvider>();

        services.AddHttpContextAccessor();
        services.AddScoped<ISessionAccessor, SessionAccessor>();

        return services;
    }

    private static void ConfigurePolicies(AuthorizationOptions options)
    {
        options.AddPolicy(Policies.Names.VaultManage, Policies.VaultManagePolicy);
    }
}
