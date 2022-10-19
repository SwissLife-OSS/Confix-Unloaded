// See https://aka.ms/new-console-template for more information

using System.ComponentModel.DataAnnotations;
using Confix.Tooling;
using McMaster.Extensions.CommandLineUtils;
using Microsoft.Extensions.DependencyInjection;

ServiceCollection services = new();
services.AddSingleton<RuntimeConfiguration>();

services
    .AddConfixClient()
    .ConfigureHttpClient((sp, client)
        => client.BaseAddress = new Uri(sp.GetRequiredService<RuntimeConfiguration>().Url));

IServiceProvider sp = services.BuildServiceProvider();

IConfixClient client = sp.GetRequiredService<IConfixClient>();

using var root = new CommandLineApplication<App>();
root.Conventions
    .UseDefaultConventions()
    .UseConstructorInjection(sp);

root.Description = "Confix Tooling";

root.OnExecute(() =>
{
    root.ShowHelp();
    return 1;
});

return await root.ExecuteAsync(args);

[Subcommand(typeof(ClaimCommand))]
public class App
{
}

public abstract class CommandBase
{
    private readonly RuntimeConfiguration _configuration;
    private readonly IConsole _console;

    public CommandBase(RuntimeConfiguration configuration, IConsole console)
    {
        _configuration = configuration;
        _console = console;
    }

    [Required]
    [Option(CommandOptionType.SingleValue,
        LongName = "url",
        ShortName = "u",
        Description = "The url of the Confix service.")]
    public string Url { get; } = string.Empty;

    public async Task<int> OnExecuteAsync(CancellationToken cancellationToken)
    {
        try
        {
            _configuration.SetupClient(Url);
            return await ExecuteAsync(cancellationToken);
        }
        catch(Exception ex)
        {
            await _console.WriteErrorAsync(ex.Message);
            return ExitCodes.Error;
        }
    }

    public abstract Task<int> ExecuteAsync(CancellationToken cancellationToken);
}


public class RuntimeConfiguration
{
    public string Url { get; set; } = string.Empty;

    public void SetupClient(string url)
    {
        UriBuilder builder = new(url);
        if (!builder.Path.EndsWith("/graphql"))
        {
            if (builder.Path.EndsWith("/"))
            {
                builder.Path = $"{builder.Path}graphql";
            }
            else
            {
                builder.Path = $"{builder.Path}/graphql";
            }
        }

        Url = builder.ToString();
    }
}
