using System;

namespace Confix.Authoring.Publishing;

public class PublishingException : Exception
{
    public PublishingException(string? message) : base(message)
    {
    }

    public string Code => "PublishingError";
}

public class ClaimVersionFailedException : Exception
{
    public ClaimVersionFailedException(string? message) : base(message)
    {
    }

    public string Code => "ClaimVersionError";
}
