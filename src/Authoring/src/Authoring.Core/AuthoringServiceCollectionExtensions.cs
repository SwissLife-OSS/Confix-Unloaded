using Confix.Authoring.Applications;
using Confix.Authoring.ChangeLogs;
using Confix.Authoring.Components;
using Confix.Authoring.Internal;
using Confix.Authoring.Publishing;
using Confix.Vault.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring;

public static class AuthoringServiceCollectionExtensions
{
    public static IServiceCollection AddAuthoringCore(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddApplications();
        services.AddChangeLog();
        services.AddComponents();

        services.AddScoped<IEnvironmentService, EnvironmentService>();
        services.AddScoped<IComponentService, ComponentService>();
        services.AddScoped<IVariableService, VariableService>();
        services.AddScoped<ISchemaService, SchemaService>();
        services.AddScoped<IPublishingService, PublishingService>();
        services.AddVaultClient(configuration);

        return services;
    }
}
