namespace Confix.Authoring;

public sealed class ApplicationPartNotFoundException : Exception
{
    public ApplicationPartNotFoundException(Guid applicationId)
        : base($"The application with id `{applicationId:N}` not found.")
    {
        ApplicationPartId = applicationId;
    }

    public Guid ApplicationPartId { get; }
}
