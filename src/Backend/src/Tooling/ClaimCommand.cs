using System.ComponentModel.DataAnnotations;
using Confix.Tooling;
using McMaster.Extensions.CommandLineUtils;

[Command(Name = "claim",
    Description = "Claims a version for a particular tag",
    ResponseFileHandling = ResponseFileHandling.ParseArgsAsLineSeparated)]
public sealed class ClaimCommand : CommandBase
{
    private readonly IConfixClient _client;
    private readonly IConsole _console;

    public ClaimCommand(
        IConfixClient client,
        IConsole console,
        RuntimeConfiguration configuration) : base(configuration, console)
    {
        _client = client;
        _console = console;
    }

    [Required]
    [Option(
        CommandOptionType.SingleValue,
        LongName = "app",
        ShortName = "a",
        Description = "Specified publish application")]
    public string ApplicationName { get; } = string.Empty;

    [Required]
    [Option(CommandOptionType.SingleValue,
        LongName = "part",
        ShortName = "p",
        Description = "Specified part of the application")]
    public string ApplicationPartName { get; } = string.Empty;

    [Required]
    [Option(CommandOptionType.SingleValue,
        LongName = "env",
        ShortName = "e",
        Description = "The environment where it should be published")]
    public string EnvironmentName { get; } = string.Empty;

    [Required]
    [Option(
        CommandOptionType.SingleValue,
        LongName = "tag",
        ShortName = "t",
        Description = "The tag")]
    public string Tag { get; } = string.Empty;

    public override async Task<int> ExecuteAsync(CancellationToken cancellationToken)
    {
        ClaimVersionInput input = new()
        {
            ApplicationName = ApplicationName,
            ApplicationPartName = ApplicationPartName,
            EnvironmentName = EnvironmentName,
            GitVersion = Tag
        };

        var result = await _client.ClaimApplicationPart.ExecuteAsync(input, cancellationToken);

        if (result.Errors is { Count: > 0 })
        {
            return await _console.ReportErrors(result);
        }

        if (result.Data?.ClaimVersion is not { } mutationResult)
        {
            await _console.WriteErrorAsync("There was an unexpected error");

            return ExitCodes.Error;
        }

        if (mutationResult.Errors is { Count: > 0 })
        {
            foreach (var error in mutationResult.Errors.OfType<IError>())
            {
                await _console.ReportError(error);
            }

            return ExitCodes.Error;
        }

        if (mutationResult.ClaimedVersion is not { } claimedVersion)
        {
            await _console.WriteErrorAsync("There was an unexpected error");

            return ExitCodes.Error;
        }

        await _console.WriteSuccessAsync("Successfully claimed Version!");
        await _console.WriteSuccessAsync(
            $"Published Version: {claimedVersion.PublishedApplicationPart?.Version}");
        await _console.WriteSuccessAsync($"Token: {claimedVersion.Token}");

        return ExitCodes.Success;
    }
}
public class ExitCodes
{
    public const int Success = 0;
    public const int Error = 1;
}
