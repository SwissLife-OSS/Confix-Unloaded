using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace Confix.Authoring;

public static class SessionManagementEndpoints
{
    public static IEndpointRouteBuilder AddSessionManagement(this IEndpointRouteBuilder builder)
    {
        return builder.AddLoginEndpoint().AddLogoutEndpoint();
    }

    public static IEndpointRouteBuilder AddLogoutEndpoint(this IEndpointRouteBuilder builder)
    {
        builder.MapGet("/logout", HandleLogout);
        return builder;
    }

    public static IEndpointRouteBuilder AddLoginEndpoint(this IEndpointRouteBuilder builder)
    {
        builder.MapGet("/login", HandleLogin);
        return builder;
    }

    private static Task HandleLogin([FromQuery] string returnUrl, HttpContext ctx)
    {
        if (returnUrl is "/login")
        {
            returnUrl = "/";
        }

        return ctx.ChallengeAsync(new AuthenticationProperties() { RedirectUri = returnUrl });
    }

    private static Task HandleLogout(HttpContext ctx)
    {
        return ctx.SignOutAsync();
    }
}
