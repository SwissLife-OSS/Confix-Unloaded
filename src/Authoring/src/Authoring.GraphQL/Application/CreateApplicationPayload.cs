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

        public Application? Application { get; }
    }
}
