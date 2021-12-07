using System;

namespace Confix.Authoring;

public class EnvironmentNotFoundException : Exception
{
    public EnvironmentNotFoundException(Guid applicationId)
    {
        EnvironmentId = applicationId;
    }

    public Guid EnvironmentId { get; }
}
