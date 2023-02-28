namespace Confix.Messaging.RabbitMQ;

public class RabbitMqOptions
{
    public string HostUrl { get; set; } = string.Empty;

    public string Path { get; set; } = "/";

    public string Username { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;
}
