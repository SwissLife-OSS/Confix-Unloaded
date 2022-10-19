using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL.Applications;

public sealed class ApplicationNotFoundError : UserError
{
    public ApplicationNotFoundError(Guid applicationId) : base(
        $"The application with id `{applicationId:N}` not found.")
    {
        ApplicationId = applicationId;
    }

    public ApplicationNotFoundError(ApplicationNotFoundException exception) : this(exception
        .ApplicationId)
    {
    }

    [ID(nameof(Application))]
    public Guid ApplicationId { get; }
}
