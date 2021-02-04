using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL
{
    public class AddComponentsToApplicationPartPayload
    {
        public AddComponentsToApplicationPartPayload(
            ApplicationPart applicationPart)
        {
            ApplicationPartPart = applicationPart;
        }

        public ApplicationPart? ApplicationPartPart { get; }
    }
}
