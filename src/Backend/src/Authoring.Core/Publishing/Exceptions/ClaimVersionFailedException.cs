namespace Confix.Authoring.Publishing;

internal sealed class ClaimVersionFailedException : Exception
{
    public ClaimVersionFailedException(string? message) : base(message)
    {
    }

    public string Code => "ClaimVersionError";
}
