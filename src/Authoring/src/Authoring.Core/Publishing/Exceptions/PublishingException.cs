using System;

namespace Confix.Authoring.Publishing;

public class PublishingException : Exception
{
    public PublishingException(string? message) : base(message)
    {
    }

    public string Code => "PublishingError";
}
