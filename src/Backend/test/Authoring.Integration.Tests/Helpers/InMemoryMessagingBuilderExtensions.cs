using Confix.Messaging;
using MassTransit;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.Integration.Tests;

public static class InMemoryMessagingBuilderExtensions
{
    public static IMessagingBuilder UseInMemory(this IMessagingBuilder builder)
    {
        builder.Configurator.UsingInMemory((context, cfg) =>
        {
            cfg.ConfigureEndpoints(context);
        });

        builder.ServiceCollection.AddSingleton<IMessagingUrlFactory, InMemoryMessagingUrlFactory>();

        return builder;
    }

    public class InMemoryMessagingUrlFactory : IMessagingUrlFactory
    {
        /// <inheritdoc />
        public Uri CreateRequestClientUrl(string name, string environment)
        {
            return new Uri($"exchange:{name}-{environment}");
        }
    }
}
