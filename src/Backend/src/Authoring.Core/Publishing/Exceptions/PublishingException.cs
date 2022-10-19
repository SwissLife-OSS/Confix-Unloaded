using System;

namespace Confix.Authoring.Publishing;

internal sealed class PublishingException : Exception
{
    public PublishingException(string? message) : base(message)
    {
    }

    public string Code => "PublishingError";
}
