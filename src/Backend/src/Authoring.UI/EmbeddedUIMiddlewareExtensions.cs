using Microsoft.AspNetCore.Builder;

namespace Confix.Authoring.UI;

public static class EmbeddedUIMiddlewareExtensions
{
    public static IApplicationBuilder UseConfixUI(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<EmbeddedUiMiddleware>();
    }
}
