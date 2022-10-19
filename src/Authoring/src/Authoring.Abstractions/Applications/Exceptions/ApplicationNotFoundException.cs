namespace Confix.Authoring;

public sealed class ApplicationNotFoundException : Exception
{
    public ApplicationNotFoundException(Guid applicationId)
    {
        ApplicationId = applicationId;
    }

    public Guid ApplicationId { get; }
}
