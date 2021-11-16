using System;

namespace Confix.Authoring.GraphQL.Applications
{
    public class ApplicationPartNotFoundError : UserError
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

        public Guid ApplicationPartId { get; }
    }
}
