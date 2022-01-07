using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring;

public static class ConfixServerBuilderExtensions
{
    public static IConfixServerBuilder AddConfixAuthoringServer(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var builder = new ConfixServerBuilder(configuration, services);

        builder.Services.AddAuthoringCore(configuration);

        return builder;
    }
}
