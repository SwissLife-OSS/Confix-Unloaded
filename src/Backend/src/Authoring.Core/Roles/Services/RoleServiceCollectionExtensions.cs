using Confix.Authoring.Roles.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authentication.Authorization;

public static class RoleServiceCollectionExtensions
{
    public static IServiceCollection AddRoles(this IServiceCollection services)
    {
        services.AddAuthorizationRule<Role, RoleAuthorizationRule>();
        services.AddScoped<IRoleService, RoleService>();
        return services;
    }
}
