using Microsoft.AspNetCore.Builder;

namespace Confix.Authoring.UI;

public static class EmbeddedUiMiddlewareExtensions
{
    public static IApplicationBuilder UseConfixUi(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<EmbeddedUiMiddleware>();
    }
}
