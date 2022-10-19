using System;

namespace Confix.Authoring;

public sealed class EnvironmentNotFoundException : Exception
{
    public EnvironmentNotFoundException(Guid environmentId)
    {
        EnvironmentId = environmentId;
    }

    public Guid EnvironmentId { get; }
}
