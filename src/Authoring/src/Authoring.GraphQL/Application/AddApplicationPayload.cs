using System.Collections.Generic;
using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL
{
    public class AddApplicationPayload
    {
        public AddApplicationPayload(Application application)
        {
            Application = application;
        }

        public AddApplicationPayload(IAddApplicationError error)
            : this(new[] { error })
        {
        }

        public AddApplicationPayload(IReadOnlyList<IAddApplicationError> errors)
        {
            Errors = errors;
        }

        public Application? Application { get; }

        public IReadOnlyList<IAddApplicationError>? Errors { get; }
    }
}
