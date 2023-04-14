using System.CommandLine.Builder;
using System.CommandLine.Parsing;
using Confix.Tooling.Option;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Tooling;

internal static class ConfixClientCommandLineBuilderExtensions
{
    public static CommandLineBuilder AddConfixClient(this CommandLineBuilder builder)
        => builder.AddService(ConfigureConfixClient);

    private static IConfixClient ConfigureConfixClient(IServiceProvider sp)
    {
        var parseResult = sp.GetRequiredService<ParseResult>();

        var url = parseResult.GetValueForOption(Required<UrlOption>.Instance)!;

        UriBuilder builder = new(url);
        if (!builder.Path.EndsWith("/graphql"))
        {
            builder.Path = builder.Path.EndsWith("/")
                ? $"{builder.Path}graphql"
                : $"{builder.Path}/graphql";
        }

        var apiKey = parseResult.GetValueForOption(Required<ApiKeyOption>.Instance)!;

        var services = new ServiceCollection();
        services
            .AddConfixClient()
            .ConfigureHttpClient(ConfigureClient);

        return services.BuildServiceProvider().GetRequiredService<IConfixClient>();

        void ConfigureClient(HttpClient client)
        {
            client.BaseAddress = builder.Uri;
            client.DefaultRequestHeaders.Add("confix-api-key", apiKey);
        }
    }
}
