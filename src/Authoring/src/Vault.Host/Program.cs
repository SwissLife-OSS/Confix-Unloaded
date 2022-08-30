using Confix.Authoring.Store.Mongo;
using Confix.CryptoProviders.AzureKeyVault;
using Confix.Vault.Core;
using Confix.Vault.Host;
using Confix.Vault.Store.Mongo;
using Microsoft.AspNetCore.Identity;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddJsonFile("appsettings.json");
builder.Configuration.AddJsonFile("appsettings.user.json", true);
builder.Services.AddMongoStore(builder.Configuration);
builder.Services.AddKeyVaultSecrets(builder.Configuration);
builder.Services.AddMongoSecrets(builder.Configuration);
builder.Services.AddSingleton<ITokenProivder, TokenProvider>();
builder.Services.AddSingleton<IPasswordHasher<object>, PasswordHasher<object>>();
builder.Services.AddVaultCore();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

WebApplication app = builder.Build();

if (app.Environment.IsDevelopment())
{
    Console.WriteLine("Swagger UI is attached");
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
