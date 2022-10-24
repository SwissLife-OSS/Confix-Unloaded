using Confix.Authoring;
using Confix.Authoring.UI;
using Confix.CryptoProviders;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddJsonFile("appsettings.json");
builder.Configuration.AddUserSecrets("3f64ff45-7830-4fc6-b77d-eee879a369d9");

builder.Services
    .AddConfixAuthoringServer()
    .UseMongoDbStores()
    .AddVaultHttpClient()
    .ConfigureEncryption(
        descriptor => descriptor
            .UseAzureKeyVaultKeyEncryptionKeys()
            .UseMongoDbDataEncryptionKeys())
    .UseOpenIdConnect();

builder.Services
    .AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

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
app.UseConfixUi();

app.Run();
