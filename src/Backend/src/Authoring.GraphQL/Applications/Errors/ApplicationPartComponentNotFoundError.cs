using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL.Applications;

public sealed class ApplicationPartComponentNotFoundError : UserError
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

    [ID(nameof(ApplicationPartComponent))]
    public Guid ComponentPartId { get; set; }
}
