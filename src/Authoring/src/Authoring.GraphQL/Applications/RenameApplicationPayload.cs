using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL.Applications
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
