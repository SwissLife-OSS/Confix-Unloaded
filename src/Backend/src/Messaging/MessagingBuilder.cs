using MassTransit;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Messaging;

public sealed class MessagingBuilder
    : IMessagingBuilder
{
    public MessagingBuilder(
        IBusRegistrationConfigurator configurator, IServiceCollection serviceCollection)
    {
        Configurator = configurator;
        ServiceCollection = serviceCollection;
    }

    public IBusRegistrationConfigurator Configurator { get; }

    public IServiceCollection ServiceCollection { get; }
}
