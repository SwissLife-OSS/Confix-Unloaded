using Confix.Authentication.Authorization;
using Confix.Authoring.Components.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.Components;

public static class ComponentServiceCollectionExtensions
{
    public static IServiceCollection AddComponents(this IServiceCollection services)
    {
        services.AddAuthorizationRule<Component, ComponentAuthorizationRule>();
        services.AddScoped<IComponentService, ComponentService>();

        return services;
    }
}
