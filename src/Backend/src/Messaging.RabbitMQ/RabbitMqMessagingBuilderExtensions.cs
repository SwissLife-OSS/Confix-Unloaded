using Confix.Common;
using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace Confix.Messaging.RabbitMQ;

public static class RabbitMqMessagingBuilderExtensions
{
    public static IMessagingBuilder UseRabbitMq(this IMessagingBuilder builder)
    {
        builder.ServiceCollection.AddOptions<RabbitMqOptions>()
            .BindConfiguration(Settings.Confix.Messaging.RabbitMq.Section);

        builder.Configurator.UsingRabbitMq((context, cfg) =>
        {
            var options = context.GetRequiredService<IOptions<RabbitMqOptions>>().Value;

            if (options is not { })
            {
                return;
            }

            cfg.Host(options.HostUrl,
                options.Path,
                configurator =>
                {
                    configurator.Username(options.Username);
                    configurator.Password(options.Password);
                });

            cfg.ConfigureEndpoints(context);
        });

        builder.ServiceCollection.AddSingleton<IMessagingUrlFactory, RabbitMqMessagingUrlFactory>();

        return builder;
    }
}
