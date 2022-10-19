using System;

namespace Confix.Authoring;

public class ComponentNotFoundException : Exception
{
    public ComponentNotFoundException(Guid componentId)
        : base($"The component with id `{componentId:N}` was not found.")
    {
        ComponentId = componentId;
    }

    public Guid ComponentId { get; }
}
