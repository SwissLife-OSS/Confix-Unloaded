namespace Confix.Authoring.GraphQL.Components
{
    public class RenameComponentPayload
    {
        public RenameComponentPayload(Component component)
        {
            Component = component;
        }

        public Component Component { get; }
    }
}
