using Microsoft.AspNetCore.Builder;

namespace Microsoft.Extensions.DependencyInjection;

public static class EndpointRouteBuilderExtensions
{
    public static T UseConfixVault<T>(this T builder)
        where T : IApplicationBuilder
    {
        builder.UseRouting();
        builder.UseAuthentication();
        builder.UseAuthorization();
        builder.UseEndpoints(x => x.MapControllers());

        return builder;
    }
}
