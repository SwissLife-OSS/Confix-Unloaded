using Confix.Authentication.Authorization;
using Confix.Authoring.Publishing.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.Publishing;

public static class PublishingServiceCollectionExtensions
{
    public static IServiceCollection AddPublishing(this IServiceCollection services)
    {
        services.AddAuthorizationRule<PublishedApplicationPart,
            PublishedApplicationPartAuthorizationRule>();
        services.AddScoped<IPublishingService, PublishingService>();
    }
}
