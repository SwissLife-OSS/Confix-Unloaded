// See https://aka.ms/new-console-template for more information

using System.Text.Json;
using Confix.Vault.Client;
using Microsoft.Extensions.DependencyInjection;

CancellationTokenSource cancellationTokenSource = new();
var cancellationToken = cancellationTokenSource.Token;

Console.CancelKeyPress += (_, eventArgs) =>
{
    Console.WriteLine("Cancel event triggered");
    cancellationTokenSource.Cancel();
    eventArgs.Cancel = true;
};

var client = new ServiceCollection().AddVaultClient()
    .BuildServiceProvider()
    .GetRequiredService<IVaultClient>();

Console.Write("Application Name: ");
var applicationName = ReadLine(cancellationToken);
Console.Write("Application Part Name: ");
var applicationPartName = ReadLine(cancellationToken);
Console.Write("Environment Name: ");
var environmentName = ReadLine(cancellationToken);
Console.Write("Token: ");
var token = ReadLine(cancellationToken);

Console.WriteLine("Fetching...");
using var response = await client
    .GetAsync(applicationName, applicationPartName, environmentName, token, cancellationToken);

Console.WriteLine("Response...");

JsonSerializerOptions options = new() { WriteIndented = true };
Console.WriteLine(JsonSerializer.Serialize(response, options));

static string ReadLine(CancellationToken cancellationToken)
{
    var value = Console.ReadLine();

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
