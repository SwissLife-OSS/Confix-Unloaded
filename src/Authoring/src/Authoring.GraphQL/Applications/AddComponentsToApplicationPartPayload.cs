using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL.Applications
{
    public class AddComponentsToApplicationPartPayload
    {
        public AddComponentsToApplicationPartPayload(
            ApplicationPart? applicationPart,
            Application? application)
        {
            ApplicationPart = applicationPart;
            Application = application;
        }

        public ApplicationPart? ApplicationPart { get; }

        public Application? Application { get; }
    }
}
