using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL.Applications
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
