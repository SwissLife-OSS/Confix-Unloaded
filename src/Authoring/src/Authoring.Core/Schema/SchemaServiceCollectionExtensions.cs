using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.Internal;

public static class SchemaServiceCollectionExtensions
{
    public static IServiceCollection AddSchemas(this IServiceCollection services)
    {
        services.AddScoped<ISchemaService, SchemaService>();
        return services;
    }
}
