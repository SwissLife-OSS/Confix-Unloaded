using System.CommandLine;
using Confix.Tooling;
using Confix.Tooling.Option;
using Spectre.Console;

public sealed class ClaimCommand : Command
{
    public ClaimCommand() : base("claim")
    {
        Description = "Claims a version for a particular tag";

        AddOption(Required<AppOption>.Instance);
        AddOption(Required<PartOption>.Instance);
        AddOption(Required<EnvironmentOption>.Instance);
        AddOption(Required<TagOption>.Instance);

        this.SetHandler(
            ExecuteAsync,
            Bind.FromServiceProvider<IAnsiConsole>(),
            Bind.FromServiceProvider<IConfixClient>(),
            Required<AppOption>.Instance,
            Required<PartOption>.Instance,
            Required<EnvironmentOption>.Instance,
            Required<TagOption>.Instance,
            Bind.FromServiceProvider<CancellationToken>());
    }

    private static async Task<int> ExecuteAsync(
        IAnsiConsole console,
        IConfixClient client,
        string app,
        string part,
        string environment,
        string tag,
        CancellationToken cancellationToken)
    {
        var input = new ClaimVersionInput()
        {
            ApplicationName = app,
            ApplicationPartName = part,
            EnvironmentName = environment,
            Tag = tag
        };

        var result = await client.ClaimApplicationPart.ExecuteAsync(input, cancellationToken);

        console.EnsureNoError(result);

        if (result.Data?.ClaimVersion is not { } mutationResult)
        {
            console.Error("There was an unexpected error");

            return ExitCodes.Error;
        }

        if (mutationResult.Errors is { Count: > 0 })
        {
            foreach (var error in mutationResult.Errors.OfType<IError>())
            {
                console.ReportError(error);
            }

            return ExitCodes.Error;
        }

        if (mutationResult.ClaimedVersion is not { } claimedVersion)
        {
            console.Error("There was an unexpected error");

            return ExitCodes.Error;
        }

        console.Success("Successfully claimed Version!");
        console.MarkupLine($"""
            [dim]Published Version: [bold]{claimedVersion.PublishedApplicationPart?.Version}[/][/]
            [dim]Token:             [bold]{claimedVersion.PublishedApplicationPart?.Version}[/][/]
            """);

        return ExitCodes.Success;
    }
}
