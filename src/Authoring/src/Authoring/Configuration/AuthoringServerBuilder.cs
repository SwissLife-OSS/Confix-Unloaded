using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring;

internal sealed class AuthoringServerBuilder : IAuthoringServerBuilder
{
    public AuthoringServerBuilder(IServiceCollection services)
    {
        Services = services;
    }

    public IServiceCollection Services { get; }
}
