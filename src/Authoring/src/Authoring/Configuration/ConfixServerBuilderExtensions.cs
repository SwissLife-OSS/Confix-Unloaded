using Confix.Authentication.Authorization;
using Confix.Authoring.GraphQL;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring;

public static class ConfixAuthoringServerBuilderExtensions
{
    public static IAuthoringServerBuilder AddConfixAuthoringServer(this IServiceCollection services)
    {
        services.AddMemoryCache();

        services.AddSeedWorker();
        services.AddAuthoringGraphQL();
        services.AddSessionAccessor();
        services.AddAuthorizationAndPolicies();
        services.AddAuthoringCore();

        var builder = new AuthoringServerBuilder(services);

        return builder;
    }
}
