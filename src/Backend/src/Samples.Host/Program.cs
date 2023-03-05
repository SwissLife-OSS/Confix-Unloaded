var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddVaultConfiguration("Test-App", "Test-Part");

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
