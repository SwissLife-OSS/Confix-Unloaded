using Confix.Tooling;
using Spectre.Console;
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
}
