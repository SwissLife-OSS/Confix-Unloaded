using System;

namespace Confix.Authoring.GraphQL.Applications;

public class ComponentNotFoundError : UserError
{
    public ComponentNotFoundError(Guid componentId)
        : base($"The component with id `{componentId:N}` was not found.")
    {
        ComponentId = componentId;
    }

    public ComponentNotFoundError(ComponentNotFoundException exception)
        : this(exception.ComponentId)
    {
    }

    public Guid ComponentId { get; }
}
