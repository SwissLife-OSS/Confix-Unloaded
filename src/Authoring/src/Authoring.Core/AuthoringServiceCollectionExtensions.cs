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
        services.AddScoped<IUserSessionAccessor, DoNotUserSessionAccessor>();
        services.AddScoped<IChangeLogService, ChangeLogService>();
        services.AddScoped<IApplicationService, ApplicationService>();
        services.AddScoped<IEnvironmentService, EnvironmentService>();
        services.AddScoped<IComponentService, ComponentService>();
        services.AddScoped<IVariableService, VariableService>();
        services.AddScoped<ISchemaService, SchemaService>();
        services.AddScoped<IPublishingService, PublishingService>();
        services.AddSingleton<IVariableCryptoProvider, DoNotUseVariableCrypoProvider>();
        services.AddVaultClient(configuration);

        return services;
    }
}
