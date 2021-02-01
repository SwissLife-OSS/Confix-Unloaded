using System.Collections.Generic;

namespace Confix.Authoring.GraphQL
{
    public class UpdateComponentPayload : Payload
    {
        public Component? Component { get; }

        public UpdateComponentPayload(Component component)
        {
            Component = component;
        }   
    }

}
