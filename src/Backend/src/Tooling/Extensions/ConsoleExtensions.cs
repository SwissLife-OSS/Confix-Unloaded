using System.Text.Json;
using Confix.Tooling;
using Confix.Tooling;
using Spectre.Console;
using Spectre.Console;
using Spectre.Console.Json;
using Spectre.Console.Rendering;
using StrawberryShake;

public static class ConsoleExtensions
{
    public static void Error(this IAnsiConsole console, string message)
    {
        console.MarkupLine($"[red]{message.EscapeMarkup()}[/]");
    }

    public static void Success(this IAnsiConsole console, string message)
    {
        console.MarkupLine($"[green]{message.EscapeMarkup()}[/]");
    }

    public static void EnsureNoError(this IAnsiConsole console, IOperationResult result)
    {
        if (result.Errors is { Count: > 0 })
        {
            foreach (var error in result.Errors)
            {
                console.Error(error.Message);
            }

            throw new ExitException();
        }
    }

    public static void ReportError(this IAnsiConsole console, IError error)
        => console.Error(error.Message);

    /// <summary>
    /// Writes a json object to the console
    /// </summary>
    /// <param name="console">
    /// The console to write to
    /// </param>
    /// <param name="data">
    /// The data to write
    /// </param>
    public static void WriteJson(this IAnsiConsole console, object? data)
    {
        var serializedData = JsonSerializer.Serialize(data, new JsonSerializerOptions()
        {
            WriteIndented = true
        });

        var jsonText = new JsonText(serializedData);

        console.Write(jsonText);
    }
}
