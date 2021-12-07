using System;

namespace Confix.Authoring.GraphQL.Applications;

public class EnvironmentNotFoundError : UserError
{
    public EnvironmentNotFoundError(Guid envId)
        : base($"The environment with id `{envId:N}` not found.")
    {
        EnvironmentId = envId;
    }

    public EnvironmentNotFoundError(EnvironmentNotFoundException exception)
        : this(exception.EnvironmentId)
    {
    }

    public Guid EnvironmentId { get; }
}
