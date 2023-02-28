using Confix.Authoring;
using Confix.Authoring.Messaging;
using Confix.Authoring.UI;
using Confix.CryptoProviders;
using Confix.Messaging.RabbitMQ;
using IdentityModel;
using Microsoft.AspNetCore.Authentication.OAuth.Claims;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddConfixAuthoringServer()
    .UseMongoDbStores()
    .AddVaultHttpClient()
    .ConfigureMessaging(x => x.UseRabbitMq())
    .ConfigureEncryption(descriptor => descriptor
        .UseAzureKeyVaultKeyEncryptionKeys()
        .UseMongoDbDataEncryptionKeys())
    .ConfigureAuthentication(descriptor
        => descriptor.UseOpenIdConnectAndJwtBearerLogin().AddJwtBearer().AddOpenIdConnect());

builder.Services
    .AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

builder.Services
    .PostConfigure(
        OpenIdConnectDefaults.AuthenticationScheme,
        (OpenIdConnectOptions options) =>
        {
            options.ClaimActions.Add(
                new JsonKeyClaimAction(
                    JwtClaimTypes.Role,
                    JwtClaimTypes.Role,
                    JwtClaimTypes.Role));
        });

builder.Services.AddCors(
    options =>
        options.AddDefaultPolicy(
            policyBuilder => policyBuilder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseAuthoringServer();
if (app.Environment.IsDevelopment())
{
    app.UseEndpoints(x => x.MapReverseProxy());
}
else
{
    app.UseConfixUi();
}

app.Run();
