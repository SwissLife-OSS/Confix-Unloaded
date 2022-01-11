using System;

namespace Confix.Authoring.GraphQL.Applications;

public class ApplicationNotFoundError : UserError
{
    public ApplicationNotFoundError(Guid applicationId)
        : base($"The application with id `{applicationId:N}` not found.")
    {
        ApplicationId = applicationId;
    }

    public ApplicationNotFoundError(ApplicationNotFoundException exception)
        : this(exception.ApplicationId)
    {
    }

    public Guid ApplicationId { get; }
}
