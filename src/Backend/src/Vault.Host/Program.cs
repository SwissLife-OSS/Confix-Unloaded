using Confix.Authoring.Authentication;
using Confix.CryptoProviders;
using Confix.Messaging.RabbitMQ;
using Confix.Vault;
using Confix.Vault.Messaging;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services
    .AddConfixVaultServer()
    .UseMongoDbStores()
    .UseAuthentication()
    .ConfigureMessaging(x => x.UseRabbitMq())
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
