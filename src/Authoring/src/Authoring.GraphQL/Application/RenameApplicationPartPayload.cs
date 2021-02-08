using System.Collections.Generic;
using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL
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
