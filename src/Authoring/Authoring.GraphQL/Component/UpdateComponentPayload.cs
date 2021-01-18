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

        public UpdateComponentPayload(
            IReadOnlyList<UserError>? errors = null)
            : base(errors)
        {
        }
    }

}
