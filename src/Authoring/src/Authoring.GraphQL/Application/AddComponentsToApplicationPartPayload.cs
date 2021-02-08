using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL
{
    public class AddComponentsToApplicationPartPayload
    {
        public AddComponentsToApplicationPartPayload(
            ApplicationPart applicationPart)
        {
            ApplicationPart = applicationPart;
        }

        public ApplicationPart? ApplicationPart { get; }
    }
}
