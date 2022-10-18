using Microsoft.AspNetCore.Builder;

namespace Confix.Authoring.Authentication;

public static class AuthenticationApplicationBuilderExtensions
{
    public static IApplicationBuilder UseAutomaticLogin(this IApplicationBuilder builder)
    {
        builder.UseMiddleware<LoginMiddleware>();
        return builder;
    }
}
