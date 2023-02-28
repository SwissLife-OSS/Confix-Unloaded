using MassTransit;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Messaging;

public interface IMessagingBuilder
{
    IBusRegistrationConfigurator Configurator { get; }

    IServiceCollection ServiceCollection { get; }
}
