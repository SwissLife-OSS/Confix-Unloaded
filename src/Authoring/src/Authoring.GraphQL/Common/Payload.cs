using System.Collections.Generic;

namespace Confix.Authoring.GraphQL
{
    public abstract class Payload
    {
        protected Payload(IReadOnlyList<IUserError>? errors = null)
        {
            Errors = errors;
        }

        public IReadOnlyList<IUserError>? Errors { get; }
    }


}
