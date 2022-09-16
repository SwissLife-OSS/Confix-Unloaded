using Confix.Authentication;
using Confix.Vault.Client;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace Confix.Authoring.Authentication;

public static class AuthenticationExtensions
{
    public static IServiceCollection AddAuthentication(this IServiceCollection serviceCollection)
    {
        serviceCollection
            .AddAuthentication(ConfigureAuthentication)
            .AddCookie(ConfigureCookies)
            .AddOpenIdConnect();

        serviceCollection
            .AddOptions<OpenIdConnectOptions>(OpenIdConnectDefaults.AuthenticationScheme)
            .BindConfiguration("Confix:Authoring:OpenIdConnectOptions");

        serviceCollection.AddClientCredentialsClient(
            VaultClient.HttpClientName,
            "Confix:Authoring:VaultClient");
    }

    private static void ConfigureAuthentication(
        Microsoft.AspNetCore.Authentication.AuthenticationOptions x)
    {
        x.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        x.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
    }

    private static void ConfigureCookies(CookieAuthenticationOptions x)
    {
        x.Cookie.SameSite = SameSiteMode.Strict;
        x.Cookie.HttpOnly = true;
        x.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    }
}
