using MassTransit;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Messaging;

public static class MessagingServiceCollectionConfigurationExtensions
{
    public static IServiceCollection ConfigureMessaging(
        this IServiceCollection services,
        Action<IMessagingBuilder> configure)
    {
        services.AddMassTransit(x =>
        {
            configure(new MessagingBuilder(x, services));
        });
        return services;
    }
}
