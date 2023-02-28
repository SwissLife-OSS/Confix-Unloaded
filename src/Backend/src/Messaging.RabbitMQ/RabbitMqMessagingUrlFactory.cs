namespace Confix.Messaging.RabbitMQ;

internal class RabbitMqMessagingUrlFactory : IMessagingUrlFactory
{
    public Uri CreateRequestClientUrl(string name, string environment)
    {
        return new Uri($"exchange:{name}-{environment}");
        //return new UriBuilder(_options.HostUrl) { Path = $"/{topic}-{environment}" }.Uri;
    }
}
