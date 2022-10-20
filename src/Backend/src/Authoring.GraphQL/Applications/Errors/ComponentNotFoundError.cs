namespace Confix.Authoring.GraphQL.Applications;

public sealed class ComponentNotFoundError : UserError
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

    [ID(nameof(Component))]
    public Guid ComponentId { get; }
}
