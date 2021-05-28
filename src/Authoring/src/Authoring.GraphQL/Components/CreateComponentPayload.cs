namespace Confix.Authoring.GraphQL.Components
{
    public class CreateComponentPayload
    {
        public CreateComponentPayload(Component component)
        {
            Component = component;
        }

        public Component Component { get; }
    }
}
