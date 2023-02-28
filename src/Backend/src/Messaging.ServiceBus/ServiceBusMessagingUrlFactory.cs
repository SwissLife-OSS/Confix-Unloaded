namespace Confix.Messaging.RabbitMQ;

internal class ServiceBusMessagingUrlFactory : IMessagingUrlFactory
{
    public Uri CreateRequestClientUrl(string name, string environment)
    {
        return new Uri($"queue:{name}-{environment}");
    }
}
