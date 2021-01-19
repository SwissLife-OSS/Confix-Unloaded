using System.Collections.Generic;
using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL
{
    public class UpdateApplicationPayload : Payload
    {
        public Application? Application { get; }

        public UpdateApplicationPayload(Application application)
        {
            Application = application;
        }

        public UpdateApplicationPayload(
            IReadOnlyList<UserError>? errors = null)
            : base(errors)
        {
        }
    }


}
