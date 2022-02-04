using Confix.Vault.Core;
using Confix.Vault.Host;
using Confix.Vault.Store.Mongo;
using Microsoft.AspNetCore.Identity;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddMongoStore(builder.Configuration);
builder.Services.AddSingleton<IKeyProvider, DoNotUseKeyProvider>();
builder.Services.AddSingleton<IApiKeyProvider, ApiKeyKeyProvider>();
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
