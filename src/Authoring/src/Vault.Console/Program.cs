// See https://aka.ms/new-console-template for more information

using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using Confix.Vault.Client;
using Microsoft.Extensions.DependencyInjection;

const string vaultUrl = "http://localhost:5003";

CancellationTokenSource cancellationTokenSource = new();
CancellationToken cancellationToken = cancellationTokenSource.Token;

Console.CancelKeyPress += (sender, eventArgs) =>
{
    Console.WriteLine("Cancel event triggered");
    cancellationTokenSource.Cancel();
    eventArgs.Cancel = true;
};

IVaultClient client = new ServiceCollection()
    .AddVaultClient(vaultUrl)
    .BuildServiceProvider()
    .GetRequiredService<IVaultClient>();

Console.Write("Application Name: ");
string applicationName = ReadLine(cancellationToken);
Console.Write("Application Part Name: ");
string applicationPartName = ReadLine(cancellationToken);
Console.Write("Environment Name: ");
string environmentName = ReadLine(cancellationToken);
Console.Write("Token: ");
string token = ReadLine(cancellationToken);

Console.WriteLine("Fetching...");
using JsonDocument? response =
    await client.GetAsync(
        applicationName,
        applicationPartName,
        environmentName,
        token,
        cancellationToken);

Console.WriteLine("Response...");

JsonSerializerOptions options = new() { WriteIndented = true };
Console.WriteLine(JsonSerializer.Serialize(response, options));

static string ReadLine(CancellationToken cancellationToken)
{
    string? value = Console.ReadLine();
    while (!cancellationToken.IsCancellationRequested && string.IsNullOrEmpty(value))
    {
        Console.Write("Value cannot be null");
        value = Console.ReadLine();
    }

    if (value is null)
    {
        throw new TaskCanceledException("");
    }

    return value;
}
