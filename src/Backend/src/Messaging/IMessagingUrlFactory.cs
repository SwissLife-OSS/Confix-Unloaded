namespace Confix.Messaging;

public interface IMessagingUrlFactory
{
    Uri CreateRequestClientUrl(string name, string environment);
}
