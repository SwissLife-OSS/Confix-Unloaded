using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL.Applications
{
    public class RenameApplicationPartPayload
    {
        public RenameApplicationPartPayload(ApplicationPart applicationPart)
        {
            ApplicationPart = applicationPart;
        }

        public ApplicationPart? ApplicationPart { get; }
    }
}
