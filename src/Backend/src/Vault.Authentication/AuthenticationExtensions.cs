using Confix.Common;
using Confix.Vault;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.Authentication;

public static class AuthenticationExtensions
{
    public static IVaultServerBuilder UseAuthentication(
        this IVaultServerBuilder builder,
        string pathToConfig = Settings.Confix.Vault.Authentication.JwtBearer.Section)
    {
        builder.Services
            .AddAuthentication()
            .AddJwtBearer();

        builder.Services
            .AddOptions<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme)
            .BindConfiguration(pathToConfig);

        return builder;
    }
}
