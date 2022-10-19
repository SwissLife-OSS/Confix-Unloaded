using Confix.Tooling;
using McMaster.Extensions.CommandLineUtils;
using StrawberryShake;

public static class ConsoleExtensions
{
    public static Task WriteErrorAsync(this IConsole console, string message)
    {
        using (console.WithColor(ConsoleColor.Red))
        {
            return console.Error.WriteLineAsync(message);
        }
    }

    public static Task WriteSuccessAsync(this IConsole console, string message)
    {
        using (console.WithColor(ConsoleColor.Green))
        {
            return console.Out.WriteLineAsync(message);
        }
    }

    public static Task WriteDefaultAsync(this IConsole console, string message)
    {
        using (console.WithColor(ConsoleColor.White))
        {
            return console.Out.WriteLineAsync(message);
        }
    }

    public static async Task<int> ReportErrors(this IConsole console, IOperationResult result)
    {
        if (result.Errors is { Count: > 0 })
        {
            foreach (var error in result.Errors)
            {
                await console.WriteErrorAsync(error.Message);
            }

            return ExitCodes.Error;
        }

        return ExitCodes.Success;
    }

    public static async Task ReportError(this IConsole console, IError error)
    {
        await console.WriteErrorAsync(error.Message);
    }

    public static IDisposable WithColor(this IConsole console, ConsoleColor color)
    {
        return new UseConsoleColor(console, color);
    }

    private class UseConsoleColor : IDisposable
    {
        private readonly IConsole _console;
        private readonly ConsoleColor _previous;

        public UseConsoleColor(IConsole console, ConsoleColor color)
        {
            _console = console;
            _previous = color;
            _console.ForegroundColor = color;
        }

        public void Dispose()
        {
            _console.ForegroundColor = _previous;
        }
    }
}
