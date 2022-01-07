using System;

namespace Confix.Authoring;

public class ApplicationPartNotFoundException : Exception
{
    public ApplicationPartNotFoundException(Guid applicationId)
        : base($"The application with id `{applicationId:N}` not found.")
    {
        ApplicationPartId = applicationId;
    }

    public Guid ApplicationPartId { get; }
}
