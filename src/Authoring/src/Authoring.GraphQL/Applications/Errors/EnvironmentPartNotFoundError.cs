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

    [ID(nameof(Environment))]
    public Guid EnvironmentId { get; }
}
