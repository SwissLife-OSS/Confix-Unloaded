using Confix.Authentication.Authorization;
using Confix.Authoring.GraphQL;
using Confix.Authoring.Store.Mongo;
using Confix.CryptoProviders.AzureKeyVault;
using Confix.Authoring.Authentication;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace Confix.Authoring;

public class Startup
{
    public IConfiguration Configuration { get; }
    public IWebHostEnvironment HostEnvironment { get; }

    public Startup(IConfiguration configuration, IWebHostEnvironment hostEnvironment)
    {
        Configuration = configuration;
        HostEnvironment = hostEnvironment;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services
            .AddMemoryCache()
            .RegisterAuthentication()
            .AddSessionAccessor()
            .AddAuthorizationAndPolicies()
            .AddKeyVaultSecrets(Configuration)
            .AddMongoSecrets(Configuration)
            .AddConfixAuthoringServer(Configuration)
            .AddMongoStore()
            .AddGraphQLServer();

        services
            .AddReverseProxy()
            .LoadFromConfig(Configuration.GetSection("ReverseProxy"));

        services.AddSeedWorker();

        services.AddCors(options =>
        {
            options.AddPolicy("Any",
                builder =>
                {
                    builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                });
        });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseAuthentication();
        app.UseRouting();

        app.UseAuthorization();
        app.UseCors("Any");

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapGet("/logout", ctx => ctx.SignOutAsync());
            endpoints.MapGet("/login",
                ([FromQuery] string? returnUrl, HttpContext ctx) =>
                {
                    if (returnUrl is "/login")
                    {
                        returnUrl = "/";
                    }

                    return ctx.ChallengeAsync(
                        new AuthenticationProperties() { RedirectUri = returnUrl });
                });
            endpoints.MapReverseProxy();
            endpoints.MapGraphQL();
        });
    }
}
