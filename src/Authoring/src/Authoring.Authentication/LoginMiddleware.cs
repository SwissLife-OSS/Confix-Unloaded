using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;

namespace Confix.Authoring.Authentication;

public class LoginMiddleware
{
    public static readonly string PostLoginQueryKey = "post_login";

    private readonly RequestDelegate _next;

    public LoginMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Path.StartsWithSegments("/_health") ||
            context.Request.Path.StartsWithSegments("/graphql") ||
            context.Request.Query.ContainsKey(PostLoginQueryKey))
        {
            await _next(context);
        }
        else if (context.User.Identity?.IsAuthenticated is not true)
        {
            await context.ChallengeAsync();
        }
        else
        {
            await _next(context);
        }
    }
}
