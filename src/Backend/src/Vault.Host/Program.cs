using Confix.CryptoProviders;
using Confix.Vault;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddJsonFile("appsettings.json");

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddConfixVaultServer()
    .UseMongoDbStores()
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
