using Confix.Common;
using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace Confix.Messaging.RabbitMQ;

public static class ServiceBusMessagingBuilderExtensions
{
    public static IMessagingBuilder UseServiceBus(this IMessagingBuilder builder)
    {
        builder.ServiceCollection.AddOptions<ServiceBusOptions>()
            .BindConfiguration(Settings.Confix.Messaging.ServiceBus.Section);

        builder.Configurator.UsingAzureServiceBus((context, cfg) =>
        {
            var options = context.GetRequiredService<IOptions<ServiceBusOptions>>().Value;

            if (options is not { })
            {
                return;
            }

            cfg.Host(options.ConnectionString);
            cfg.ConfigureEndpoints(context);
        });

        builder.ServiceCollection
            .AddSingleton<IMessagingUrlFactory, ServiceBusMessagingUrlFactory>();

        return builder;
    }
}
