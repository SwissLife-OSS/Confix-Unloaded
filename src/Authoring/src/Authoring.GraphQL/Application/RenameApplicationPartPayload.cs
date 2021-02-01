using System.Collections.Generic;
using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL
{
    public class RenameApplicationPartPayload
    {
        public RenameApplicationPartPayload(ApplicationPart applicationPart)
        {
            ApplicationPart = applicationPart;
        }

        public RenameApplicationPartPayload(IRenameApplicationPartError error)
            : this(new[] { error })
        {
        }

        public RenameApplicationPartPayload(IReadOnlyList<IRenameApplicationPartError> errors)
        {
            Errors = errors;
        }

        public ApplicationPart? ApplicationPart { get; }

        public IReadOnlyList<IRenameApplicationPartError>? Errors { get; }
    }
}
