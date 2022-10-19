using Confix.Authoring;
using Confix.Authoring.Authentication;
using Confix.Authoring.Store.Mongo;
using Confix.CryptoProviders.AzureKeyVault;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddJsonFile("appsettings.json");

builder.Services.AddConfixAuthoringServer()
    .UseMongoDbStores()
    .AddVaultHttpClient()
    .ConfigureEncryption(descriptor
        => descriptor.UseAzureKeyVaultKeyEncryptionKeys().UseMongoDbDataEncryptionKeys())
    .UseOpenIdConnect();

builder.Services
    .AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

builder.Services.AddCors(options =>
    options.AddDefaultPolicy(
        builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseAuthoringServer();

app.Run();
