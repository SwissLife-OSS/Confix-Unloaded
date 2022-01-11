using System;

namespace Confix.Authoring;

public class ApplicationNotFoundException : Exception
{
    public ApplicationNotFoundException(Guid applicationId)
    {
        ApplicationId = applicationId;
    }

    public Guid ApplicationId { get; }
}
