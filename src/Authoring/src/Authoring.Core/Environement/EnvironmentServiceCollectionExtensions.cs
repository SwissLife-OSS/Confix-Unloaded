using Confix.Authentication.Authorization;
using Confix.Authoring.Environement.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.Environement;

public static class EnvironmentServiceCollectionExtensions
{
    public static IServiceCollection AddEnvironments(this IServiceCollection services)
    {
        services.AddAuthorizationRule<Environment, EnvironmentAuthorizationRule>();
        services.AddScoped<IEnvironmentService, EnvironmentService>();
    }
}
