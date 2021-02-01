using System.Collections.Generic;
using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL
{
    public class CreateApplicationPayload
    {
        public CreateApplicationPayload(Application application)
        {
            Application = application;
        }

        public CreateApplicationPayload(IAddApplicationError error)
            : this(new[] { error })
        {
        }

        public CreateApplicationPayload(IReadOnlyList<IAddApplicationError> errors)
        {
            Errors = errors;
        }

        public Application? Application { get; }

        public IReadOnlyList<IAddApplicationError>? Errors { get; }
    }
}
