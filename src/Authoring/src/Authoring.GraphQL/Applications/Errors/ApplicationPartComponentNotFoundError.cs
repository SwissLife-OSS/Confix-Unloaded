using System;

namespace Confix.Authoring.GraphQL.Applications;

public class ApplicationPartComponentNotFoundError : UserError
{
    public ApplicationPartComponentNotFoundError(Guid componentPartId)
        : base($"The component part with id {componentPartId:N}.")
    {
        ComponentPartId = componentPartId;
    }

    public ApplicationPartComponentNotFoundError(
        ApplicationPartComponentNotFoundException exception)
        : this(exception.ComponentPartId)
    {
    }

    public Guid ComponentPartId { get; set; }
}
