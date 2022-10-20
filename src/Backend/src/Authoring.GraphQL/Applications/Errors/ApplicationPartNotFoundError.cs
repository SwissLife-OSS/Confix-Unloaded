using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL.Applications;

public sealed class ApplicationPartNotFoundError : UserError
{
    public ApplicationPartNotFoundError(Guid applicationId)
        : base($"The application part with id `{applicationId:N}` not found.")
    {
        ApplicationPartId = applicationId;
    }

    public ApplicationPartNotFoundError(ApplicationPartNotFoundException exception)
        : this(exception.ApplicationPartId)
    {
    }

    [ID(nameof(ApplicationPart))]

    public Guid ApplicationPartId { get; }
}
