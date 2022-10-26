using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring;

public interface IAuthoringServerAuthenticationBuilder
{
    IServiceCollection Services { get; }

    IAuthoringServerAuthenticationBuilder ConfigureAuthentication(
        Action<AuthenticationOptions> configure);

    IAuthoringServerAuthenticationBuilder ConfigureBuilder(Action<AuthenticationBuilder> configure);
}
