namespace Confix.Authoring.GraphQL.Components
{
    public class UpdateComponentSchemaPayload
    {
        public UpdateComponentSchemaPayload(Component component)
        {
            Component = component;
        }

        public Component Component { get; }
    }
}
