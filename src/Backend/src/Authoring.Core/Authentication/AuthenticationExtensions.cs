using Confix.Authentication.ApiKey;
using Confix.Common;
using IdentityModel;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using SameSiteMode = Microsoft.AspNetCore.Http.SameSiteMode;

namespace Confix.Authoring;

public static class AuthenticationExtensions
{
    public static IAuthoringServerBuilder ConfigureAuthentication(
        this IAuthoringServerBuilder builder,
        Action<IAuthoringServerAuthenticationBuilder> configure)
    {
        configure(new AuthoringServerAuthenticationBuilder(builder.Services));
        return builder;
    }

    public static IAuthoringServerAuthenticationBuilder UseOpenIdConnectAndJwtBearerLogin(
        this IAuthoringServerAuthenticationBuilder builder)
    {
        builder.ConfigureAuthentication(ConfigureAuthentication);
        builder.ConfigureBuilder(Configure);

        return builder;

        void Configure(AuthenticationBuilder authenticationBuilder)
        {
            authenticationBuilder.AddPolicyScheme(
                JwtOrCookieDefault.AuthenticationScheme,
                JwtOrCookieDefault.AuthenticationScheme,
                options => options.ForwardDefaultSelector = ForwardDefaultSelector);
        }

        string ForwardDefaultSelector(HttpContext context)
        {
            if (context.Request.Headers.ContainsKey(ApiKeyDefaults.HeaderName))
            {
                return ApiKeyDefaults.AuthenticationScheme;
            }

            string? authorization = context.Request.Headers[HeaderNames.Authorization];
            if (!string.IsNullOrEmpty(authorization) && authorization.StartsWith("Bearer "))
            {
                return JwtBearerDefaults.AuthenticationScheme;
            }

            return CookieAuthenticationDefaults.AuthenticationScheme;
        }
    }

    public static IAuthoringServerAuthenticationBuilder AddJwtBearer(
        this IAuthoringServerAuthenticationBuilder builder,
        string pathToConfig = Settings.Confix.Authoring.Authentication.JwtBearer.Section)
    {
        builder.ConfigureBuilder(x => x.AddJwtBearer());

        builder.Services
            .AddOptions<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme)
            .BindConfiguration(pathToConfig);

        return builder;
    }

    public static IAuthoringServerAuthenticationBuilder AddOpenIdConnect(
        this IAuthoringServerAuthenticationBuilder builder,
        string pathToConfig = Settings.Confix.Authoring.Authentication.OpenIdConnect.Section)
    {
        builder.ConfigureBuilder(x => x.AddCookie(ConfigureCookies).AddOpenIdConnect());

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
        x.DefaultScheme = JwtOrCookieDefault.AuthenticationScheme;
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

internal static class JwtOrCookieDefault
{
    public const string AuthenticationScheme = "JWT_OR_COOKIE";
}
