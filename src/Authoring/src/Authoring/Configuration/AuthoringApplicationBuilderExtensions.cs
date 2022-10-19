using Microsoft.AspNetCore.Builder;

namespace Confix.Authoring;

public static class AuthoringApplicationBuilderExtensions
{
    public static IApplicationBuilder UseAuthoringServer(this IApplicationBuilder builder)
    {
        builder.UseRouting();
        builder.UseAuthentication();
        builder.UseAuthorization();
        builder.UseCors();
        builder.UseEndpoints(endpoints =>
        {
            endpoints.AddSessionManagement();
            endpoints.MapGraphQL();
        });

        return builder;
    }
}
