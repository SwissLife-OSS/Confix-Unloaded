using Confix.Authoring.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring
{
    public static class AuthoringServiceCollectionExtensions
    {
        public static IServiceCollection AddAuthoringCore(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddScoped<IApplicationService, ApplicationService>();
            services.AddScoped<IComponentService, ComponentService>();
            services.AddScoped<IVariableService, VariableService>();
            services.AddScoped<ISchemaService, SchemaService>();
            services.AddSingleton<IVariableCryptoProvider, DoNotUseVariableCrypoProvider>();

            return services;
        }
    }
}
