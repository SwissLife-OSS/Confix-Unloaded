using System.Net.Http.Headers;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Value.Configuration;

internal static class AuthoringClientFactory
{
    public static IAuthoringClient CreateClient(string authoringUrl, string accessToken)
    {
        var services = new ServiceCollection();

        if (!Uri.TryCreate(authoringUrl, UriKind.Absolute, out var uri))
        {
            throw new ArgumentException("The authoring url is not a valid url");
        }

        services
            .AddAuthoringClient()
            .ConfigureHttpClient(x =>
            {
                x.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", accessToken);
                x.BaseAddress = uri;
            });

        return services.BuildServiceProvider().GetRequiredService<IAuthoringClient>();
    }
}

