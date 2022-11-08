using Confix.Authentication.ApiKey;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring;

internal class AuthoringServerAuthenticationBuilder : IAuthoringServerAuthenticationBuilder
{
    private readonly AuthenticationBuilder _builder;
    private readonly List<Action<AuthenticationOptions>> _configureAuthenticationOptions = new();

    public AuthoringServerAuthenticationBuilder(IServiceCollection services)
    {
        Services = services;
        _builder = services.AddAuthentication(ConfigureAuthentication);
        _builder.AddApiKey();
    }

    public IServiceCollection Services { get; }

    public IAuthoringServerAuthenticationBuilder ConfigureAuthentication(
        Action<AuthenticationOptions> configure)
    {
        _configureAuthenticationOptions.Add(configure);
        return this;
    }

    public IAuthoringServerAuthenticationBuilder ConfigureBuilder(
        Action<AuthenticationBuilder> configure)
    {
        configure(_builder);
        return this;
    }

    private void ConfigureAuthentication(AuthenticationOptions options)
    {
        _configureAuthenticationOptions.ForEach(configure => configure(options));
    }
}
