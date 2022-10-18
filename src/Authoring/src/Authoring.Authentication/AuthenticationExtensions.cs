using Confix.Authentication;
using Confix.Vault.Client;
using IdentityModel;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Confix.Authoring.Authentication;

public static class AuthenticationExtensions
{
    public static IServiceCollection RegisterAuthentication(
        this IServiceCollection serviceCollection)
    {
        serviceCollection
            .AddAuthentication(ConfigureAuthentication)
            .AddCookie(ConfigureCookies)
            .AddOpenIdConnect();

        serviceCollection
            .AddOptions<OpenIdConnectOptions>(OpenIdConnectDefaults.AuthenticationScheme)
            .Configure(x =>
            {
                x.CorrelationCookie.SameSite = SameSiteMode.None;
                x.GetClaimsFromUserInfoEndpoint = true;
                x.ClaimActions.MapAll();
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    NameClaimType = JwtClaimTypes.Name,
                    RoleClaimType = JwtClaimTypes.Role
                };
            })
            .BindConfiguration("Confix:Authoring:OpenIdConnectOptions");

        serviceCollection.AddClientCredentialsClient(
            VaultClient.HttpClientName,
            "Confix:Authoring:VaultClient");

        return serviceCollection;
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
