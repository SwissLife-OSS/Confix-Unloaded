namespace Confix.Authoring.GraphQL.Components
{
    public class UpdateComponentValuesPayload
    {
        public UpdateComponentValuesPayload(Component component)
        {
            Component = component;
        }

        public Component Component { get; }
    }
}
