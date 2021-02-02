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

        public Application? Application { get; }
    }
}
