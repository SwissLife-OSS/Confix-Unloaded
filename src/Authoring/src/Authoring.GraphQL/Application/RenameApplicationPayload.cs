using System.Collections.Generic;
using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL
{
    public class RenameApplicationPayload
    {
        public RenameApplicationPayload(Application application)
        {
            Application = application;
        }

        public RenameApplicationPayload(IRenameApplicationError error)
            : this(new[] { error })
        {
        }

        public RenameApplicationPayload(IReadOnlyList<IRenameApplicationError> errors)
        {
            Errors = errors;
        }

        public Application? Application { get; }

        public IReadOnlyList<IRenameApplicationError>? Errors { get; }
    }
}
