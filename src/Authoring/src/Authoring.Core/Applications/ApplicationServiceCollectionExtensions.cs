using Confix.Authentication.Authorization;
using Confix.Authoring.Store;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.Applications;

public static class ApplicationRequestExecutorBuilderExtensions
{
    public static IServiceCollection AddApplications(this IServiceCollection services)
    {
        services.AddAuthorizationRule<Application, ApplicationAuthorizationRule>();
        services.AddAuthorizationRule<ApplicationPart, ApplicationPartAuthorizationRule>();
        services.AddAuthorizationRule<ApplicationPartComponent,
            ApplicationPartComponentAuthorizationRule>();

        services.AddScoped<IApplicationService, ApplicationService>();

        return services;
    }
}
