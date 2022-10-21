using Confix.Common;
using IdentityModel;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Confix.Authoring;

public static class AuthenticationExtensions
{
    public static IAuthoringServerBuilder UseOpenIdConnect(
        this IAuthoringServerBuilder builder,
        string pathToConfig = Settings.Confix.Authoring.Authentication.OpenIdConnect.Section)
    {
        builder.Services
            .AddAuthentication(ConfigureAuthentication)
            .AddCookie(ConfigureCookies)
            .AddOpenIdConnect();

        builder.Services
            .AddOptions<OpenIdConnectOptions>(OpenIdConnectDefaults.AuthenticationScheme)
            .Configure(x =>
            {
                x.CorrelationCookie.SameSite = SameSiteMode.None;
                x.GetClaimsFromUserInfoEndpoint = true;
                x.ClaimActions.MapAll();
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    NameClaimType = JwtClaimTypes.Name, RoleClaimType = JwtClaimTypes.Role
                };
            })
            .BindConfiguration(pathToConfig);

        return builder;
    }

    private static void ConfigureAuthentication(AuthenticationOptions x)
    {
        x.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        x.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
    }

    private static void ConfigureCookies(CookieAuthenticationOptions x)
    {
        x.Cookie.SameSite = SameSiteMode.Strict;
        x.Cookie.HttpOnly = true;
        x.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        x.Cookie.Name = "confix";
    }
}
