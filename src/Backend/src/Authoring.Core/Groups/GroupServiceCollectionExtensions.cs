using Confix.Authoring.Groups.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authentication.Authorization;

public static class GroupServiceCollectionExtensions
{
    public static IServiceCollection AddGroups(this IServiceCollection services)
    {
        services.AddAuthorizationRule<Group, GroupAuthorizationRule>();
        services.AddScoped<IGroupService, GroupService>();

        return services;
    }
}
