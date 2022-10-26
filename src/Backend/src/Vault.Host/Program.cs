using Confix.Authoring.Authentication;
using Confix.CryptoProviders;
using Confix.Vault;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services
    .AddConfixVaultServer()
    .UseMongoDbStores()
    .UseAuthentication()
    .ConfigureEncryption(x => x
        .UseMongoDbDataEncryptionKeys()
        .UseAzureKeyVaultKeyEncryptionKeys());

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    Console.WriteLine("Swagger UI is attached");
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseConfixVault();

app.Run();
